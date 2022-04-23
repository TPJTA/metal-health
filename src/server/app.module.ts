import { Module } from '@nestjs/common';
import { ViewModule } from './view/view.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AriticleModule } from './modules/article/ariticle.module';
import { TestingModule } from './modules/testing/testing.module';
import { AuthModule } from './auth/auth.module';
import { InboxModule } from './modules/inbox/inbox.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(),
    AriticleModule,
    TestingModule,
    InboxModule,
    AuthModule,
    ViewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
