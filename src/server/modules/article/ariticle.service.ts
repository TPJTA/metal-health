import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { FileService } from '../file/file.service';
import { Like } from 'typeorm';
import * as path from 'path';

@Injectable()
export class AriticleService {
  imgPath: string;
  constructor(
    @InjectRepository(Article) private article: Repository<Article>,
    private fileService: FileService,
  ) {
    this.imgPath = path.join(process.cwd(), 'src/server/public/img');
  }

  async getAriticleList(page: number, size: number, title?: string) {
    const [data, count] = await this.article.findAndCount({
      skip: (page - 1) * size,
      take: size,
      where: title ? { title: Like(`%${title}%`) } : null,
    });
    return { data, count };
  }

  async getAriticleById(id: number) {
    const ariticleData = await this.article.findOne({
      where: { id },
    });
    if (!ariticleData) {
      throw new HttpException('no found', 400);
    }
    const { times, ...data } = ariticleData;
    ariticleData.times = times + 1;
    this.article.save(ariticleData);
    return { data };
  }

  async addAriticle(title: string, content: string, cover: string) {
    const ariticle = new Article();
    ariticle.title = title;
    ariticle.content = content;
    ariticle.cover = cover;
    await this.article.save(ariticle);
    return { data: ariticle };
  }

  async removeAriticle(id: number) {
    const ariticle = await this.article.findOneBy({ id });
    if (!ariticle) {
      throw new HttpException('no found', 400);
    }
    await this.article.delete(ariticle);
    return { data: 'ok' };
  }

  async updateAriticle(
    id: number,
    updateParam: {
      title?: string;
      content?: string;
      cover?: string;
    },
  ) {
    const ariticle = await this.article.findOneBy({ id });
    if (!ariticle) {
      throw new HttpException('no found', 400);
    }
    for (const i in updateParam) {
      if (updateParam[i]) {
        ariticle[i] = updateParam[i];
      }
    }
    await this.article.save(ariticle);
    return { data: ariticle };
  }
}
