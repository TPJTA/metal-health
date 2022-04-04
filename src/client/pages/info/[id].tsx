import React, { useEffect, useState } from 'react';
import styles from '@/styles/info.module.scss';
import { storys } from '@/mocks/story';
import Image from 'next/image';
import Head from 'next/head';
import { Skeleton } from 'antd';
import { useRouter } from 'next/router';
import useApi from '@/api/hook';
import type { Ariticle } from '@/libs/types';

function InfoItem() {
  const router = useRouter();
  const [story, setStory] = useState<Ariticle>();
  const { getAriticle } = useApi(['getAriticle']);
  useEffect(() => {
    const { id } = router.query;
    if (id) {
      getAriticle(id as string)
        .then((res) => {
          if (res.data) {
            setStory(res.data);
          } else {
            router.replace('/404');
          }
        })
        .catch(() => {
          router.replace('/404');
        });
    }
  }, [router, getAriticle]);
  // const story = storys[];

  return (
    <div className={styles['info-item']}>
      <Head>
        <title>文章</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      {story ? (
        <div className={styles['info-item-cotain']}>
          <div className={styles['info-item-cover']}>
            <Image src={story.cover} alt="" layout="fill" />
          </div>

          <div className={styles['info-item-box']}>
            <div className={styles['info-item-title']}>{story.title}</div>
            <div
              className={styles['info-item-content']}
              dangerouslySetInnerHTML={{ __html: story.content }}
            />
          </div>
        </div>
      ) : (
        <div className={styles['info-skeleton']}>
          <Skeleton.Image className={styles['info-skeleton-image']} />
          <Skeleton active />
        </div>
      )}
    </div>
  );
}

export default InfoItem;
