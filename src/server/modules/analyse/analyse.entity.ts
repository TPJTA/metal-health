import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import * as moment from 'moment';

export type AnalyseType = 'visite' | 'testing' | 'question';

@Entity()
export class Analyse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', comment: '类型' })
  type: AnalyseType;

  @Column({ type: 'int', comment: '次数' })
  times: number;

  @Column({
    type: 'date',
    default: () => `'${moment().format('YYYY-MM-DD')}'`,
  })
  createTime: string;
}
