import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, IsUrl } from 'class-validator';
import { ListDTO } from '../../../libs/publicDTO';

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

  @IsUrl({
    require_protocol: false,
    require_host: false,
    allow_protocol_relative_urls: true,
  })
  readonly cover: string;
}

export class UpdateArticleDTO {
  @Type(() => Number)
  @IsInt()
  readonly id: number;

  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly content: string;

  @IsOptional()
  @IsUrl({
    require_protocol: false,
    require_host: false,
    allow_protocol_relative_urls: true,
  })
  readonly cover: string;
}
