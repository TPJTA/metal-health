import { ListDTO } from 'src/server/public/dto';
import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class GetTestingList extends ListDTO {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  type?: number;
}
