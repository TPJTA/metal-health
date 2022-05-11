import { ListDTO } from '../../../libs/publicDTO';
import {
  IsArray,
  IsIn,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  IsUrl,
  Min,
  ValidateNested,
} from 'class-validator';
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

class AnswerType {
  @IsString()
  title: string;

  @IsInt()
  score: number;
}
class AddQuestion {
  @IsOptional()
  @IsUrl({
    require_protocol: false,
    require_host: false,
    allow_protocol_relative_urls: true,
  })
  img?: string;

  @IsString()
  title: string;

  @IsArray()
  @ValidateNested()
  @Type(() => AnswerType)
  answers: AnswerType[];
}

class AddResult {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsString()
  desc: string;

  @IsInt()
  score: number;
}

export class AddTestingDTO {
  @IsString()
  name: string;

  @IsString()
  desc: string;

  @Type(() => Number)
  @IsIn([0, 1, 2, 3])
  type: 0 | 1 | 2 | 3;

  @IsArray()
  @ValidateNested()
  @Type(() => AddQuestion)
  questions: AddQuestion[];

  @IsUrl({
    require_protocol: false,
    require_host: false,
    allow_protocol_relative_urls: true,
  })
  cover: string;

  @IsString()
  resultStr: string;

  @IsArray()
  @ValidateNested()
  @Type(() => AddResult)
  results: AddResult[];
}

export class UpdateTestingtDTO {
  @Type(() => Number)
  @IsInt()
  readonly id: number;

  @IsOptional()
  @IsString()
  desc?: string;

  @IsOptional()
  @Type(() => Number)
  @IsIn([0, 1, 2, 3])
  type?: 0 | 1 | 2 | 3;

  @IsOptional()
  @IsUrl({
    require_protocol: false,
    require_host: false,
    allow_protocol_relative_urls: true,
  })
  cover?: string;

  @IsOptional()
  @IsString()
  resultStr?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested()
  @Type(() => AddResult)
  results?: AddResult[];
}

export class AddQuestionDTO {
  @Type(() => Number)
  @IsInt()
  readonly id: number;

  @IsObject()
  @ValidateNested()
  @Type(() => AddQuestion)
  question: AddQuestion;
}
