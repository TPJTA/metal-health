import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Type,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AnalyseTrackingService } from './analyseTracking.service';
import type { AnalyseType } from './analyse.entity';

// @Injectable()
// class AnalyseInterceptor implements NestInterceptor {
//   constructor(
//     private readonly type: AnalyseType, // private readonly analyseTrackingService: AnalyseTrackingService,
//   ) {}
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     // this.analyseTrackingService.addEvent(type);

//     return next.handle();
//   }
// }

export function AnalyseTracking(type: AnalyseType): Type<NestInterceptor> {
  @Injectable()
  class AnalyseInterceptor implements NestInterceptor {
    constructor(
      private readonly analyseTrackingService: AnalyseTrackingService,
    ) {}
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      this.analyseTrackingService.addEvent(type);

      return next.handle();
    }
  }
  return AnalyseInterceptor;
}
