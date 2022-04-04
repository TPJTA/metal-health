import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class GetArticleDTO {
  @Type(() => Number)
  @IsInt()
  readonly id: number;
}

export class GetArticleListDTO {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly size?: number;

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
