import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ViewModule } from './view/view.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AriticleModule } from './modules/article/ariticle.module';
import { TestingModule } from './modules/testing/testing.module';
import { AuthModule } from './auth/auth.module';
import { InboxModule } from './modules/inbox/inbox.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { FileModule } from './modules/file/file.module';
import { AnalyseModule } from './modules/analyse/analyse.module';
import * as Monitor from 'express-status-monitor';
import { join } from 'path';

const configModule = ConfigModule.forRoot({
  isGlobal: true,
});
@Module({
  imports: [
    configModule,
    TypeOrmModule.forRoot({
      keepConnectionAlive: true,
      entities: [join(process.cwd(), 'dist/**/*.entity.js')],
    }),
    MailerModule.forRoot({
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
        from: `"大学生心理健康网" <${process.env.EMAIL_USERNAME}>`,
      },
    }),
    AnalyseModule,
    FileModule,
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(Monitor()).forRoutes('/');
  }
}
