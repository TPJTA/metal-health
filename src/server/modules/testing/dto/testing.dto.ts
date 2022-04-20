import { ListDTO } from 'src/server/libs/publicDTO';
import { IsInt, IsOptional } from 'class-validator';
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
