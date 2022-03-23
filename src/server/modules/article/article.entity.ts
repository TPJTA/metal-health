import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', comment: '文章名字' })
  title: string;

  @Column({ type: 'text', comment: '文章内容' })
  content: string;

  @Column({ type: 'varchar', comment: '图片地址' })
  cover: string;
}
