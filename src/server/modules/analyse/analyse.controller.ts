import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { AnalyseService } from './analyse.service';
import { GeAnalyseDetailDTO, GetTestingResultAnalyse } from './dto/analyse.dto';

@Controller('/api/analyse')
export class AnalyseController {
  constructor(private readonly analyseService: AnalyseService) {}

  @Get('')
  getAnalyse() {
    return this.analyseService.getAnalyse();
  }

  @Get('/detail')
  getDetail(@Query(ValidationPipe) { type }: GeAnalyseDetailDTO) {
    return this.analyseService.getDetail(type);
  }

  @Get('/testing')
  getTestingAnalyse() {
    return this.analyseService.getTestingAnalyse();
  }

  @Get('/testing/result')
  getTestingResultAnalyse(
    @Query(new ValidationPipe({ transform: true }))
    { id }: GetTestingResultAnalyse,
  ) {
    return this.analyseService.getTestingResultAnalyse(id);
  }
}
