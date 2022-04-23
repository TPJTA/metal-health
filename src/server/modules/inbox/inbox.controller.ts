import { Controller, Post, ValidationPipe, Body } from '@nestjs/common';
import { GetInboxQuestionDTO } from './dto/inbox.dto';
import { InboxService } from './inbox.service';

@Controller('/api/inbox')
export class InboxController {
  constructor(private readonly inboxService: InboxService) {}

  @Post()
  getInboxQuestion(
    @Body(new ValidationPipe()) { email, content }: GetInboxQuestionDTO,
  ) {
    return this.inboxService.saveInbox(email, content);
  }
}
