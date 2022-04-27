import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { join } from 'path';
import { readFileSync } from 'fs';
import { Like } from 'typeorm';
import * as fs from 'fs/promises';
import * as path from 'path';
import { getHexName } from '../../libs/tool';

@Injectable()
export class AriticleService {
  imgPath: string;
  constructor(@InjectRepository(Article) private article: Repository<Article>) {
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
    const { times, ...data } = ariticleData;
    ariticleData.times = times + 1;
    this.article.save(ariticleData);
    return { data };
  }

  async addAriticle(
    title: string,
    content: string,
    cover: Express.Multer.File,
  ) {
    const saveFileName = getHexName(cover);
    const ariticle = new Article();
    ariticle.title = title;
    ariticle.content = content;
    ariticle.cover = path.join('/img', saveFileName).replace(/\\/g, '/');
    await Promise.all([
      this.article.save(ariticle),
      fs.writeFile(path.join(this.imgPath, saveFileName), cover.buffer),
    ]);
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
      cover?: Express.Multer.File;
    },
  ) {
    const ariticle = await this.article.findOneBy({ id });
    if (!ariticle) {
      throw new HttpException('no found', 400);
    }
    for (const i in updateParam) {
      if (updateParam[i]) {
        if (i === 'cover') {
          const saveFileName = getHexName(updateParam[i]);
          ariticle.cover = path.join('/img', saveFileName).replace(/\\/g, '/');
          await fs.writeFile(
            path.join(this.imgPath, saveFileName),
            updateParam[i].buffer,
          );
        } else {
          ariticle[i] = updateParam[i];
        }
      }
    }
    await this.article.save(ariticle);
    return { data: ariticle };
  }
}
