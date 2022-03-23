import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '@/components/header';
import styles from '@/styles/info.module.scss';
import { Input, List, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { storys } from '@/mocks/story';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Info: NextPage = function () {
  const router = useRouter();

  return (
    <div className={styles['info']}>
      <Head>
        <title>文章</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <div className={styles['info-contain']}>
        <div className={styles['info-header']}>
          <div className={styles['info-headline']}>查询你的故事</div>
          <Input
            prefix={<SearchOutlined />}
            placeholder="搜索...."
            className={styles['info-search']}
          />
        </div>

        <List
          className={styles['info-list']}
          itemLayout="vertical"
          bordered
          size="large"
          dataSource={storys}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              extra={<Image src={item.cover} alt="" />}
              onClick={() => router.push(`/info/${item.id}`)}
            >
              <List.Item.Meta title={item.title} />
              <div className={styles['info-content']}>{item.content}</div>
            </List.Item>
          )}
        />
        <div className={styles['info-more']}>
          <Button block type="primary">
            查看更多
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Info;
