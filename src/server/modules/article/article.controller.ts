import {
  Controller,
  Get,
  ValidationPipe,
  Query,
  Post,
  Put,
  UseInterceptors,
  UploadedFile,
  Body,
  HttpException,
  Delete,
} from '@nestjs/common';
import {
  GetArticleDTO,
  GetArticleListDTO,
  AddArticleDTO,
  UpdateArticleDTO,
} from './dto/article.dto';
import { AriticleService } from './ariticle.service';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('/api/aritice')
export class AriticleController {
  constructor(private readonly ariticleService: AriticleService) {}

  /** 获取文章 */
  @Get('')
  getArtice(
    @Query(new ValidationPipe({ transform: true }))
    { id }: GetArticleDTO,
  ) {
    return this.ariticleService.getAriticleById(id);
  }

  /** 获取文章列表 */
  @Get('/list')
  getArticleList(
    @Query(new ValidationPipe({ transform: true }))
    { page = 1, size = 10, title }: GetArticleListDTO,
  ) {
    return this.ariticleService.getAriticleList(page, size, title);
  }

  /**添加文章 */
  @Post()
  addArticle(
    @Body(new ValidationPipe())
    { content, title, cover }: AddArticleDTO,
  ) {
    return this.ariticleService.addAriticle(title, content, cover);
  }

  /**修改文章 */
  @Put()
  updateArticle(
    @Body(new ValidationPipe())
    { content, title, id, cover }: UpdateArticleDTO,
  ) {
    return this.ariticleService.updateAriticle(id, { content, title, cover });
  }

  /**删除文章 */
  @Delete()
  removeArticle(
    @Body(new ValidationPipe())
    { id }: GetArticleDTO,
  ) {
    return this.ariticleService.removeAriticle(id);
  }
}
