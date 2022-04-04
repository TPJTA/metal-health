import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { join } from 'path';
import { readFileSync } from 'fs';
import { Like } from 'typeorm';
@Injectable()
export class AriticleService {
  constructor(
    @InjectRepository(Article) private article: Repository<Article>,
  ) {}

  async getAriticleList(page: number, size: number, title?: string) {
    const [data, count] = await this.article.findAndCount({
      skip: (page - 1) * size,
      take: size,
      where: title ? { title: Like(`%${title}%`) } : null,
    });
    return { data, count };
  }

  async getAriticleById(id: number) {
    const data = await this.article.findOne({ where: { id } });
    return { data };
  }

  addAriticle() {
    const story = JSON.parse(
      readFileSync(join(process.cwd(), 'src/server/modules/storys/4.json'), {
        encoding: 'utf-8',
      }),
    );

    return story;
  }
}
