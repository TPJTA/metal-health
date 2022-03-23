import React, { useEffect, useState } from 'react';
import styles from '@/styles/info.module.scss';
import { storys } from '@/mocks/story';
import type {
  GetStaticProps,
  GetStaticPaths,
  NextPage,
  InferGetStaticPropsType,
} from 'next';
import Image from 'next/image';
import Head from 'next/head';
import Header from '@/components/header';
import { Skeleton } from 'antd';
import { useRouter } from 'next/router';

function InfoItem() {
  const router = useRouter();
  const [story, setStory] = useState<typeof storys[number]>();
  useEffect(() => {
    const { id } = router.query;
    if (id) {
      const curStory = storys.find((i) => i.id.toString() === id);
      if (curStory) {
        setStory(curStory);
      } else {
        router.replace('/404');
      }
    }
  }, [router]);
  // const story = storys[];

  return (
    <div className={styles['info-item']}>
      <Head>
        <title>文章</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      {story ? (
        <div className={styles['info-item-cotain']}>
          <div className={styles['info-item-cover']}>
            <Image src={story.cover} alt="" layout="fill" />
          </div>

          <div className={styles['info-item-box']}>
            <div className={styles['info-item-title']}>{story.title}</div>
            <div className={styles['info-item-content']}>{story.content}</div>
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
