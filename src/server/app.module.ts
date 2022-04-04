import { Module } from '@nestjs/common';
import { ViewModule } from './view/view.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AriticleModule } from './modules/article/ariticle.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(), AriticleModule, AuthModule, ViewModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
