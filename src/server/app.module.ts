import { Module } from '@nestjs/common';
import { ViewModule } from './view/view.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AriticleModule } from './modules/article/ariticle.module';
import { TestingModule } from './modules/testing/testing.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql' as const,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [join(process.cwd(), 'dist/**/*.entity{.ts,.js}')],
      synchronize: true,
    }),
    AriticleModule,
    TestingModule,
    AuthModule,
    ViewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
