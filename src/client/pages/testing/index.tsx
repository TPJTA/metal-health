import React, { useState, useEffect, useRef } from 'react';
import styles from '@/styles/testing.module.scss';
import { Menu, MenuProps, Button, Skeleton } from 'antd';
import useApi from '@/api/hook';
import type { TestingListType } from '@/api/testing';
import { HTMLToText } from '@/libs/tool';
import TestingTag from '@/components/testingTag';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

const MenuItem = [
  {
    label: '全部',
  },
  {
    label: '健康',
  },
  {
    label: '性格',
  },
  {
    label: '社交',
  },
  {
    label: '能力',
  },
];

function Testing() {
  const { getTestingList } = useApi('getTestingList');
  const [testingList, setTestList] = useState<TestingListType>([]);
  const [testingType, setTestingType] = useState<'0' | '1' | '2' | '3' | '4'>(
    '0',
  );
  const page = useRef(1);
  const [showMore, setShowMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const getAriticle = () => {
    if (!isLoading) {
      setIsLoading(true);
      const param: any = { page: page.current, size: 8 };
      if (testingType !== '0') {
        param.type = parseInt(testingType) - 1;
      }
      getTestingList(param).then((res) => {
        let curStory;
        if (page.current === 1) {
          curStory = [...res.data];
        } else {
          curStory = [...testingList, ...res.data];
        }
        setTestList(curStory);
        page.current++;
        setIsLoading(false);
        if (curStory.length >= res.count) {
          setShowMore(false);
        } else {
          setShowMore(true);
        }
      });
    }
  };

  const changeListType: MenuProps['onClick'] = (e) => {
    setTestingType(e.key as any);
  };

  useEffect(() => {
    page.current = 1;
    setTestList([]);
    getAriticle();
  }, [testingType]);

  return (
    <div className={styles['testing']}>
      <Head>
        <title>测试</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <div className={styles['testing-box']}>
        <div className={styles['testing-header']}>
          <div className={styles['testing-headline']}>测试</div>
          <Menu
            mode="horizontal"
            selectedKeys={[testingType]}
            className={styles['testing-menu']}
            onClick={changeListType}
          >
            {MenuItem.map((item, index) => (
              <Menu.Item className={styles['testing-menu-item']} key={index}>
                {item.label}
              </Menu.Item>
            ))}
          </Menu>
        </div>
        <Skeleton
          active
          className={styles['testing-skeleton']}
          paragraph={{ rows: 20 }}
          loading={testingList.length === 0}
        >
          <div className={styles['testing-list']}>
            {testingList.map((item) => (
              <Link passHref href={`/testing/${item.id}`} key={item.id}>
                <div className={styles['testing-item']}>
                  <div className={styles['testing-cover']}>
                    <Image
                      src={process.env.NEXT_PUBLIC_ORIGIN + item.cover}
                      alt=""
                      layout="fill"
                    />
                  </div>
                  <div className={styles['testing-contain']}>
                    <div className={styles['testing-title']}>{item.name}</div>
                    <div className={styles['testing-desc']}>
                      {HTMLToText(item.desc)}
                    </div>
                    <div className={styles['testing-extra']}>
                      <TestingTag type={item.type} />
                      <span>{item.times}人已测</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {showMore && (
            <div className={styles['testing-more']}>
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
}

export default Testing;
