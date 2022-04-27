import { Injectable, HttpException } from '@nestjs/common';
import { Inbox } from './inbox.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull, Not } from 'typeorm';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class InboxService {
  constructor(
    @InjectRepository(Inbox) private inbox: Repository<Inbox>,
    private readonly mailerService: MailerService,
  ) {}

  async saveInbox(email: string, content: string) {
    const newInbox = new Inbox();
    newInbox.email = email;
    newInbox.content = content;
    await this.inbox.save(newInbox);
    return { data: 'ok' };
  }

  async sentEmail(id: number, ans: string) {
    const email = await this.inbox.findOneBy({ id });
    if (!email) {
      throw new HttpException('no found', 400);
    }
    this.mailerService.sendMail({
      to: '785277659@qq.com',
      subject: `咨询师回答`,
      html: ans,
    });
    email.ans = ans;
    await this.inbox.save(email);
    return { data: 'ok' };
  }

  async getEmail(page: number, size: number, isAns: boolean) {
    const [data, count] = await this.inbox.findAndCount({
      skip: (page - 1) * size,
      take: size,
      where: { ans: isAns ? Not(IsNull()) : IsNull() },
    });
    return { data, count };
  }
}
