import React, { useEffect, useState } from 'react';
import styles from './story.module.scss';
import { Card, Skeleton } from 'antd';
import Heart from 'assets/icons/heart.svg';
import { useRouter } from 'next/router';
import { HTMLToText } from '@/libs/tool';
import type { Ariticle } from '@/libs/types';
import useApi from '@/api/hook';
import Image from 'next/image';

function Story() {
  const router = useRouter();
  const { getAriticleList } = useApi('getAriticleList');
  const [storys, setStory] = useState<Ariticle[]>([]);

  useEffect(() => {
    getAriticleList({ page: 1, size: 6 }).then((res) => {
      setStory(res.data);
    });
  }, [getAriticleList]);
  return (
    <div className={styles['story']}>
      <p className={styles['story-title']}>获取真实的健康故事。</p>
      <p className={styles['story-desc']}>
        无论您处于健康之旅的哪个阶段，您都会在这里上找到同样经历过的人的故事。
      </p>
      <div className={styles['story-box']}>
        <Skeleton active paragraph={{ rows: 20 }} loading={storys.length === 0}>
          {storys.map((i) => (
            <Card
              key={i.id}
              className={styles['story-card']}
              onClick={() => router.push(`/info/${i.id}`)}
            >
              <Card.Meta
                avatar={
                  <Image
                    src={process.env.NEXT_PUBLIC_ORIGIN + i.cover}
                    alt=""
                    width="64px"
                    height="64px"
                  />
                }
                title={i.title}
                description={HTMLToText(i.content)}
              />
            </Card>
          ))}
        </Skeleton>
        <div className={styles['story-more']}>
          <Heart />
          <span
            className={styles['story-more-link']}
            onClick={() => router.push('/info')}
          >
            阅读更多的健康故事 →
          </span>
        </div>
      </div>
    </div>
  );
}

export default Story;
