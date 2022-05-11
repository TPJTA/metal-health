import { IsString, IsEmail, IsInt, IsIn } from 'class-validator';
import { Type } from 'class-transformer';
import { ListDTO } from '../../../libs/publicDTO';

export class SaveInboxQuestionDTO {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly content: string;
}

export class SentEmailDTO {
  @Type(() => Number)
  @IsInt()
  readonly id: number;

  @IsString()
  readonly ans: string;
}

export class GetEmailDTO extends ListDTO {
  @Type(() => Number)
  @IsIn([0, 1])
  @Type(() => Boolean)
  readonly isAns: boolean;
}
