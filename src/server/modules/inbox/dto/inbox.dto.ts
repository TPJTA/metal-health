import { IsString, IsEmail } from 'class-validator';

export class GetInboxQuestionDTO {
  @IsEmail()
  readonly email: string;

  @IsString()
  readonly content: string;
}
