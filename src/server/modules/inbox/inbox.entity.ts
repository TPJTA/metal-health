import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/** 测试 */
@Entity()
export class Inbox {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', comment: '邮箱' })
  email: string;

  @Column({ type: 'text', comment: '问题' })
  content: string;

  @Column({ type: 'text', nullable: true, comment: '回答' })
  ans?: string;
}
