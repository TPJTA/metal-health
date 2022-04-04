import { Controller, Get, ValidationPipe, Query } from '@nestjs/common';
import { GetArticleDTO, GetArticleListDTO } from './dto/getArticle.dto';
import { AriticleService } from './ariticle.service';
@Controller('/api/aritice')
export class AriticleController {
  constructor(private readonly ariticleService: AriticleService) {}

  @Get('')
  getArtice(
    @Query(new ValidationPipe({ transform: true }))
    { id }: GetArticleDTO,
  ) {
    return this.ariticleService.getAriticleById(id);
  }

  @Get('/all')
  getArticleList(
    @Query(new ValidationPipe({ transform: true }))
    { page = 1, size = 10, title }: GetArticleListDTO,
  ) {
    return this.ariticleService.getAriticleList(page, size, title);
  }
}
