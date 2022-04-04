import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

/** 测试 */
@Entity()
export class Testing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', comment: '测试名字' })
  name: string;

  @Column({ type: 'text', comment: '测试描述' })
  desc: string;

  @Column({ type: 'int', comment: '测试类型' })
  type: number; // 健康, 性格, 社交, 能力

  @OneToMany(() => Question, (question) => question.testing)
  questions: Question[];

  @Column({ type: 'varchar', comment: '测试图片' })
  cover: string;

  @Column({ type: 'json', comment: '测试结果' })
  result: resultType;

  @Column({ type: 'int', comment: '测试次数' })
  times: number;
}

/** 测试问题 */
@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Testing, (testing) => testing.questions)
  testing: Testing;

  @Column({ type: 'varchar', comment: '问题题目' })
  title: string;

  @Column({ type: 'json', comment: '问题选项' })
  content: string[];
}

interface resultType {
  [index: number]: {
    desc: string;
    score: number;
  };
}
