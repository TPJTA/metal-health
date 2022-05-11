import React, { useEffect, useRef, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '@/styles/info.module.scss';
import { Input, List, Button, Skeleton } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { HTMLToText } from '@/libs/tool';
import type { Ariticle } from '@/libs/types';
import useApi from '@/api/hook';

const Info: NextPage = function () {
  const router = useRouter();
  const { getAriticleList } = useApi('getAriticleList');
  const [storys, setStory] = useState<Ariticle[]>([]);
  const page = useRef(1);
  const [showMore, setShowMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchKey, setSearchKey] = useState('');

  const getAriticle = () => {
    if (!isLoading) {
      setIsLoading(true);
      getAriticleList({ page: page.current, size: 6, title: searchKey }).then(
        (res) => {
          let curStory;
          if (page.current === 1) {
            curStory = [...res.data];
          } else {
            curStory = [...storys, ...res.data];
          }
          setStory(curStory);
          page.current++;
          setIsLoading(false);
          if (curStory.length >= res.count) {
            setShowMore(false);
          } else {
            setShowMore(true);
          }
        },
      );
    }
  };

  useEffect(() => {
    page.current = 1;
    getAriticle();
  }, [searchKey]);

  return (
    <div className={styles['info']}>
      <Head>
        <title>文章</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className={styles['info-contain']}>
        <div className={styles['info-header']}>
          <div className={styles['info-headline']}>查询你的故事</div>
          <Input
            onChange={(e) => setSearchKey(e.target.value)}
            prefix={<SearchOutlined />}
            placeholder="搜索...."
            className={styles['info-search']}
          />
        </div>

        <Skeleton
          active
          className={styles['info-skeleton']}
          paragraph={{ rows: 20 }}
          loading={storys.length === 0}
        >
          <List
            className={styles['info-list']}
            itemLayout="vertical"
            bordered
            size="large"
            dataSource={storys}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                extra={
                  <div className={styles['info-image']}>
                    <Image
                      src={process.env.NEXT_PUBLIC_ORIGIN + item.cover}
                      alt=""
                      layout="fill"
                    />
                  </div>
                }
                onClick={() => router.push(`/info/${item.id}`)}
              >
                <List.Item.Meta title={item.title} />
                <div className={styles['info-content']}>
                  {HTMLToText(item.content)}
                </div>
              </List.Item>
            )}
          />
          {showMore && (
            <div className={styles['info-more']}>
              <Button
                block
                type="primary"
                loading={isLoading}
                onClick={getAriticle}
              >
                查看更多
              </Button>
            </div>
          )}
        </Skeleton>
      </div>
    </div>
  );
};

export default Info;
