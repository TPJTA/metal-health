import { Card, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './testing.module.scss';
import Cover from 'assets/images/story/1.jpeg';
import Image from 'next/image';
import type { TestingListType } from '@/api/root';
import useApi from '@/api/hook';
import { htmlToText } from 'html-to-text';

function Testing() {
  const [testingList, settestingList] = useState<TestingListType>([]);
  const { getTestingList } = useApi('getTestingList');

  const typeTag = (type: number) => {
    if (type === 0) {
      return (
        <Tag color="green" key="0">
          健康
        </Tag>
      );
    } else if (type === 1) {
      return (
        <Tag color="magenta" key="1">
          性格
        </Tag>
      );
    } else if (type === 2) {
      return (
        <Tag color="blue" key="2">
          社交
        </Tag>
      );
    } else if (type === 3) {
      return (
        <Tag color="purple" key="3">
          能力
        </Tag>
      );
    }
  };

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
            cover={<Image src={i.cover} alt="" width="550px" height="225px" />}
          >
            <div className={styles['testing-button']}>去测试</div>
            <div className={styles['testing-item-name']}>{i.name}</div>
            <div className={styles['testing-item-extend']}>
              {typeTag(i.type)}
              <div className={styles['testing-item-times']}>
                {i.times}人测试过
              </div>
            </div>
            <div className={styles['testing-item-desc']}>
              {htmlToText(i.desc)}
            </div>
            {/* <Card.Meta title={i.name} description={`${i.times}人测试过`} /> */}
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Testing;
