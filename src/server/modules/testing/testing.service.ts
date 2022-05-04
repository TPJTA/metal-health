import { Injectable, HttpException } from '@nestjs/common';
import { Testing, Question, Result } from './testing.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import type {
  AddTestingDTO,
  AddQuestionDTO,
  UpdateResultDTO,
} from './dto/testing.dto';

@Injectable()
export class TestingService {
  constructor(
    @InjectRepository(Testing) private testing: Repository<Testing>,
    @InjectRepository(Question) private question: Repository<Question>,
    @InjectRepository(Result) private result: Repository<Result>,
  ) {}

  async getTesting(id) {
    const data = await this.testing.findOne({
      select: ['id', 'desc', 'cover', 'name', 'times', 'type'],
      where: { id },
    });
    return { data };
  }

  async getTestingQuestion(id) {
    const data = await this.testing.findOne({
      select: ['questions', 'id', 'times', 'name'],
      relations: ['questions'],
      where: { id },
    });
    data.times = data.times + 1;
    this.testing.save(data);
    return { data };
  }

  async getTestingList(page?: number, size?: number, type?: number) {
    const [data, count] = await this.testing.findAndCount({
      select: ['id', 'cover', 'desc', 'name', 'times', 'type'],
      skip: page !== undefined ? (page - 1) * size : null,
      take: size,
      where: type !== undefined ? { type } : null,
    });
    return { data, count };
  }

  async getTestingRes(testingId: number, score: number) {
    const data = await this.testing
      .createQueryBuilder('testing')
      .select(['testing.resultStr', 'res.desc', 'res.score'])
      .leftJoinAndSelect('testing.results', 'res')
      .where('testing.id=:id', { id: testingId })
      .orderBy('res.score', 'ASC')
      .getOne();
    let resultIndex = data.results.findIndex((item) => score < item.score);
    if (resultIndex === -1) {
      resultIndex = data.results.length - 1;
    } else {
      resultIndex--;
    }
    const result = data.results[resultIndex];
    result.times++;
    this.result.save(result);
    return { data: { resultStr: data.resultStr, result: result.desc } };
  }

  async addTesting(testing: AddTestingDTO) {
    const newTesing = new Testing();
    newTesing.name = testing.name;
    newTesing.desc = testing.desc;
    newTesing.type = testing.type;
    newTesing.cover = testing.cover;
    newTesing.resultStr = testing.resultStr;
    newTesing.questions = [];
    newTesing.results = [];
    await Promise.all([
      ...testing.questions.map(async (item) => {
        const newQuestion = new Question();
        if (item.img) {
          newQuestion.img = item.img;
        }
        newQuestion.title = item.title;
        newQuestion.answers = item.answers;
        await this.question.save(newQuestion);
        newTesing.questions.push(newQuestion);
      }),
      ...testing.results.map(async (item) => {
        const newResult = new Result();
        newResult.desc = item.desc;
        newResult.score = item.score;
        await this.result.save(newResult);
        newTesing.results.push(newResult);
      }),
    ]);
    await this.testing.save(newTesing);
    return { data: newTesing };
  }

  async removeTesting(id: number) {
    const curTesing = await this.testing.findOne({
      where: { id },
      relations: ['questions', 'results'],
    });
    if (!curTesing) {
      throw new HttpException('no found', 400);
    }
    await Promise.all([
      this.question.remove(curTesing.questions),
      this.result.remove(curTesing.results),
    ]);
    await this.testing.remove(curTesing);
    return { data: 'ok' };
  }

  async addQuestion({ id, question }: AddQuestionDTO) {
    const curTesing = await this.testing.findOne({
      where: { id },
    });
    if (!curTesing) {
      throw new HttpException('no found', 400);
    }
    const newQuestion = new Question();
    if (question.img) {
      newQuestion.img = question.img;
    }
    newQuestion.answers = question.answers;
    newQuestion.testing = curTesing;
    newQuestion.title = question.title;
    await this.question.save(newQuestion);
    return { data: newQuestion };
  }

  async removeQuestion(questionId: number) {
    const curQustion = await this.question.findOneBy({ id: questionId });
    if (!curQustion) {
      throw new HttpException('no found', 400);
    }
    await this.question.remove(curQustion);
    return { data: 'ok' };
  }

  async updateResult({ id, results }: UpdateResultDTO) {
    const curTesing = await this.testing.findOne({
      where: { id },
      relations: ['results'],
    });
    if (!curTesing) {
      throw new HttpException('no found', 400);
    }
    await this.result.remove(curTesing.results);
    await Promise.all(
      results.map(async (item) => {
        const newResult = new Result();
        newResult.testing = curTesing;
        newResult.desc = item.desc;
        newResult.score = item.score;
        await this.result.save(newResult);
      }),
    );
    return { data: 'ok' };
  }
}
