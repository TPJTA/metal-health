import { Module } from '@nestjs/common';
import { TestingController } from './testing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Testing, Question, Result } from './testing.entity';
import { TestingService } from './testing.service';

@Module({
  imports: [TypeOrmModule.forFeature([Testing, Question, Result])],
  controllers: [TestingController],
  providers: [TestingService],
})
export class TestingModule {}
