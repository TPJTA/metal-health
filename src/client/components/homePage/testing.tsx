import { Card, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './testing.module.scss';
import Image from 'next/image';
import type { TestingListType } from '@/api/root';
import useApi from '@/api/hook';
import { htmlToText } from 'html-to-text';
import TestingTag from '../testingTag';

function Testing() {
  const [testingList, settestingList] = useState<TestingListType>([]);
  const { getTestingList } = useApi('getTestingList');

  useEffect(() => {
    getTestingList({ page: 1, size: 9 }).then(({ data }) => {
      settestingList(data);
    });
  }, [getTestingList]);

  return (
    <div className={styles['testing']}>
      <p className={styles['testing-title']}>心理测试</p>
      <p className={styles['testing-desc']}>认识自己，了解他人</p>
      <div className={styles['testing-box']}>
        {testingList.map((i, index) => (
          <Card
            className={styles['testing-item']}
            key={index}
            hoverable
            cover={
              <Image
                src={process.env.NEXT_PUBLIC_ORIGIN + i.cover}
                alt=""
                width="550px"
                height="225px"
              />
            }
          >
            <div className={styles['testing-button']}>去测试</div>
            <div className={styles['testing-item-name']}>{i.name}</div>
            <div className={styles['testing-item-extend']}>
              <TestingTag type={i.type} />
              <div className={styles['testing-item-times']}>
                {i.times}人测试过
              </div>
            </div>
            <div className={styles['testing-item-desc']}>
              {htmlToText(i.desc)}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Testing;
