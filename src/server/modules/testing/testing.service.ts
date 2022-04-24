import { Injectable } from '@nestjs/common';
import { Testing, Question, Result } from './testing.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  async getTestingList(page: number, size: number, type?: number) {
    const [data, count] = await this.testing.findAndCount({
      select: ['id', 'cover', 'desc', 'name', 'times', 'type'],
      skip: (page - 1) * size,
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
}
