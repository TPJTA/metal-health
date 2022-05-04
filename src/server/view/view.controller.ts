import { Controller, Get, Res, Req, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';
import { parse } from 'url';
import { AnalyseTracking } from '../modules/analyse/analyseTracking.interceptor';
import { ViewService } from './view.service';

@Controller()
export class ViewController {
  constructor(private viewService: ViewService) {}

  @Get('*')
  @UseInterceptors(AnalyseTracking('visite'))
  async nextPage(@Req() req: Request, @Res() res: Response) {
    const parsedUrl = parse(req.url, true);

    await this.viewService
      .getNextServer()
      .render(req, res, parsedUrl.pathname, parsedUrl.query);
  }
}
