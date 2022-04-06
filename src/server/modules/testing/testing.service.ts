import { Injectable } from '@nestjs/common';
import { Testing, Question } from './testing.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TestingService {
  constructor(
    @InjectRepository(Testing) private testing: Repository<Testing>,
    @InjectRepository(Question) private question: Repository<Question>,
  ) {}

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
