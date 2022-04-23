import { Injectable } from '@nestjs/common';
import { Testing, Question } from './testing.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';

@Injectable()
export class TestingService {
  constructor(
    @InjectRepository(Testing) private testing: Repository<Testing>,
    @InjectRepository(Question) private question: Repository<Question>,
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
      select: ['questions', 'id', 'result', 'times', 'name'],
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
}
