import { Module } from '@nestjs/common';
import { TestingController } from './testing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Testing, Question } from './testing.entity';
import { TestingService } from './testing.service';

@Module({
  imports: [TypeOrmModule.forFeature([Testing, Question])],
  controllers: [TestingController],
  providers: [TestingService],
})
export class TestingModule {}
