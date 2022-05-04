import { Injectable, HttpException } from '@nestjs/common';
import { Analyse } from './analyse.entity';
import { Testing, Result } from '../testing/testing.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import * as moment from 'moment';

@Injectable()
export class AnalyseService {
  constructor(
    @InjectRepository(Analyse) private analyse: Repository<Analyse>,
    @InjectRepository(Testing) private testing: Repository<Testing>,
    @InjectRepository(Result) private result: Repository<Result>,
  ) {}

  async getAnalyse() {
    const curDate = moment().format('YYYY-MM-DD');
    const beforeDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
    const [visite, tesing, question] = await Promise.all([
      this.analyse.find({
        where: { type: 'visite', createTime: In([curDate, beforeDate]) },
        order: { createTime: 'DESC' },
      }),
      this.analyse.find({
        where: { type: 'testing', createTime: In([curDate, beforeDate]) },
      }),
      this.analyse.find({
        where: { type: 'question', createTime: In([curDate, beforeDate]) },
      }),
    ]);
    const [curVisite, beforeVisite] = visite;
    const [curTesing, beforeTesing] = tesing;
    const [curQuestion, beforeQuestion] = question;
    const getNum = (cur?: Analyse, before?: Analyse) => {
      const curNum = cur?.times ?? 0;
      const beforeNum = before?.times ?? 0;
      let rate: number;
      if (curNum === beforeNum) {
        rate = 0;
      } else if (beforeNum === 0) {
        rate = 1;
      } else {
        rate = (curNum - beforeNum) / beforeNum;
      }
      return { num: curNum, rate };
    };
    return {
      data: {
        visite: getNum(curVisite, beforeVisite),
        testing: getNum(curTesing, beforeTesing),
        question: getNum(curQuestion, beforeQuestion),
      },
    };
  }

  async getDetail(type: Analyse['type']) {
    const timeArr = [0, 1, 2, 3, 4, 5, 6, 7].map((i) =>
      moment().subtract(i, 'days').format('YYYY-MM-DD'),
    );
    const analyseArr = await this.analyse.find({
      select: ['times', 'createTime'],
      where: { createTime: In(timeArr), type },
      order: { createTime: 'DESC' },
    });
    let analyseArrIndex = 0;
    const result = timeArr.map((time) => {
      if (analyseArr[analyseArrIndex]?.createTime === time) {
        analyseArrIndex++;
        return analyseArr[analyseArrIndex - 1];
      } else {
        return {
          createTime: time,
          times: 0,
        };
      }
    });
    return { data: result };
  }

  async getTestingAnalyse() {
    const res = await this.testing
      .createQueryBuilder('testing')
      .select(['type', 'SUM(testing.times) AS sum'])
      .groupBy('type')
      .orderBy('type')
      .getRawMany();
    const data = res.map((item) => {
      return {
        ...item,
        sum: parseInt(item.sum),
      };
    });
    return { data };
  }

  async getTestingResultAnalyse(id: number) {
    const data = await this.result.find({
      select: ['testing', 'desc', 'times'],
      where: {
        testing: {
          id,
        },
      },
    });
    if (!data) {
      throw new HttpException('no found', 400);
    }
    return { data };
  }
}
