import { Controller, Post, Req, Res, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { WebHookService } from './webhook.service';

@Controller('/payload')
export class WebHookController {
  constructor(private readonly webHookService: WebHookService) {}

  @Post()
  updata(@Req() req: Request, @Res() res: Response, @Body() body) {
    console.log(body);
    return this.webHookService.updateService();
  }
}
