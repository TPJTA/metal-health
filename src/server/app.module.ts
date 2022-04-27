import { Module } from '@nestjs/common';
import { ViewModule } from './view/view.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AriticleModule } from './modules/article/ariticle.module';
import { TestingModule } from './modules/testing/testing.module';
import { AuthModule } from './auth/auth.module';
import { InboxModule } from './modules/inbox/inbox.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

const configModule = ConfigModule.forRoot({
  isGlobal: true,
});
@Module({
  imports: [
    configModule,
    TypeOrmModule.forRoot(),
    MailerModule.forRoot({
      // transport: 'smtps://tpjt_email@163.com:YKSEUHJHQZKUDUZN@smtp.163.com',
      transport: {
        host: process.env.EMAIL_HOST,
        port: 465,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
      defaults: {
        from: '"大学生心理健康网" <tpjt_email@163.com>',
      },
    }),
    AriticleModule,
    TestingModule,
    InboxModule,
    AuthModule,
    ViewModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
