import { Injectable } from '@nestjs/common';

@Injectable()
export class WebHookService {
  updateService() {
    return { msg: 'ok' };
  }
}
