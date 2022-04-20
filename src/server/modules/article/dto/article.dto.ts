import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { ListDTO } from 'src/server/libs/publicDTO';

/** 获取单一文章 */
export class GetArticleDTO {
  @Type(() => Number)
  @IsInt()
  readonly id: number;
}

/** 获取文章列表 */
export class GetArticleListDTO extends ListDTO {
  @IsOptional()
  @IsString()
  readonly title?: string;
}

export class AddArticleDTO {
  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;
}
