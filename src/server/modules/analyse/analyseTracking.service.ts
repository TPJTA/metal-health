import { Injectable } from '@nestjs/common';
import { Analyse, AnalyseType } from './analyse.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as moment from 'moment';

@Injectable()
export class AnalyseTrackingService {
  constructor(
    @InjectRepository(Analyse) private analyse: Repository<Analyse>,
  ) {}

  async addEvent(type: AnalyseType) {
    const curDate = moment().format('YYYY-MM-DD');
    let analyse = await this.analyse.findOne({
      where: { createTime: curDate, type },
      cache: true,
    });
    if (!analyse) {
      analyse = new Analyse();
      analyse.type = type;
      analyse.times = 0;
    }
    analyse.times++;
    await this.analyse.save(analyse);
  }
}
