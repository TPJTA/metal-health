import React from 'react';
import styles from './story.module.scss';
import Cover from 'assets/images/story/1.jpeg';
import { Card, Avatar } from 'antd';
import Heart from 'assets/icons/heart.svg';

const storys = [
  {
    cover: Cover,
    title: '【荐】你的情绪低落，很可能是归因的错',
    content: '父母如何避免在居家隔离期间，对孩子造成心理创伤？',
  },
  {
    cover: Cover,
    title: '【荐】你的情绪低落，很可能是归因的错',
    content: '父母如何避免在居家隔离期间，对孩子造成心理创伤？',
  },
  {
    cover: Cover,
    title: '【荐】你的情绪低落，很可能是归因的错',
    content: '父母如何避免在居家隔离期间，对孩子造成心理创伤？',
  },
  {
    cover: Cover,
    title: '【荐】你的情绪低落，很可能是归因的错',
    content: '父母如何避免在居家隔离期间，对孩子造成心理创伤？',
  },
  {
    cover: Cover,
    title: '【荐】你的情绪低落，很可能是归因的错',
    content: '父母如何避免在居家隔离期间，对孩子造成心理创伤？',
  },
  {
    cover: Cover,
    title: '【荐】你的情绪低落，很可能是归因的错',
    content: '父母如何避免在居家隔离期间，对孩子造成心理创伤？',
  },
];

function Story() {
  return (
    <div className={styles['story']}>
      <p className={styles['story-title']}>获取真实的健康故事。</p>
      <p className={styles['story-desc']}>
        无论您处于健康之旅的哪个阶段，您都会在 The Mighty
        上找到同样经历过的人的故事。
      </p>
      <div className={styles['story-box']}>
        {storys.map((i, index) => (
          <Card key={index} className={styles['story-card']}>
            <Card.Meta
              avatar={<Avatar src={i.cover.src} shape="square" size={64} />}
              title={i.title}
              description={i.content}
            />
          </Card>
        ))}
        <div className={styles['story-more']}>
          <Heart />
          <span className={styles['story-more-link']}>
            阅读更多的健康故事 →
          </span>
        </div>
      </div>
    </div>
  );
}

export default Story;
