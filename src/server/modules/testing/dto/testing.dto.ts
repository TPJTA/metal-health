import { ListDTO } from 'src/server/libs/publicDTO';
import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class GetTestingDTO {
  @Type(() => Number)
  @IsInt()
  readonly id: number;
}

export class GetTestingListDTO extends ListDTO {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  type?: number;
}

export class GetTestingResultDTO extends GetTestingDTO {
  @Type(() => Number)
  @Min(0)
  score: number;
}
