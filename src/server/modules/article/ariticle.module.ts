import { Module } from '@nestjs/common';
import { AriticleController } from './article.controller';
import { AriticleService } from './ariticle.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  controllers: [AriticleController],
  providers: [AriticleService],
})
export class AriticleModule {}
