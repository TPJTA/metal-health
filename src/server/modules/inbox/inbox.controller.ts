import {
  Controller,
  Post,
  ValidationPipe,
  Body,
  Get,
  Query,
} from '@nestjs/common';
import {
  SaveInboxQuestionDTO,
  SentEmailDTO,
  GetEmailDTO,
} from './dto/inbox.dto';
import { InboxService } from './inbox.service';

@Controller('/api/inbox')
export class InboxController {
  constructor(private readonly inboxService: InboxService) {}

  @Post()
  saveInboxQuestion(
    @Body(new ValidationPipe()) { email, content }: SaveInboxQuestionDTO,
  ) {
    return this.inboxService.saveInbox(email, content);
  }

  @Post('/sent')
  sentEmail(
    @Body(new ValidationPipe({ transform: true })) { id, ans }: SentEmailDTO,
  ) {
    return this.inboxService.sentEmail(id, ans);
  }

  @Get('/list')
  getEmailList(
    @Query(new ValidationPipe({ transform: true }))
    { isAns, page = 1, size = 10 }: GetEmailDTO,
  ) {
    return this.inboxService.getEmail(page, size, isAns);
  }
}
