import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Analyse } from './analyse.entity';
import { AnalyseTrackingService } from './analyseTracking.service';
import { AnalyseService } from './analyse.service';
import { AnalyseController } from './analyse.controller';
import { Testing, Result } from '../testing/testing.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Analyse, Testing, Result])],
  controllers: [AnalyseController],
  providers: [AnalyseTrackingService, AnalyseService],
  exports: [AnalyseTrackingService],
})
export class AnalyseModule {}
