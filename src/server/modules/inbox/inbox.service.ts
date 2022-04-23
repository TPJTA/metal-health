import { Injectable } from '@nestjs/common';
import { Inbox } from './inbox.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class InboxService {
  constructor(@InjectRepository(Inbox) private inbox: Repository<Inbox>) {}

  async saveInbox(email: string, content: string) {
    const newInbox = new Inbox();
    newInbox.email = email;
    newInbox.content = content;
    // await this.inbox.save(newInbox);
    return { data: 'ok' };
  }
}
