import { IsIn, IsInt } from 'class-validator';
import type { AnalyseType } from '../analyse.entity';
import { Type } from 'class-transformer';

/** 获取单一文章 */
export class GeAnalyseDetailDTO {
  @IsIn(['visite', 'testing', 'question'], { message: 'type error' })
  readonly type: AnalyseType;
}

export class GetTestingResultAnalyse {
  @Type(() => Number)
  @IsInt()
  readonly id: number;
}
