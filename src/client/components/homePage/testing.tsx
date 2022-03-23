import { Card } from 'antd';
import React from 'react';
import styles from './testing.module.scss';
import Cover from 'assets/images/story/1.jpeg';
import Image from 'next/image';

const testings = [
  {
    name: '恋爱智商测试',
    times: 1111,
    cover: Cover,
    desc: 'We support each other daily. No matter what you’re going through, you won’t be alone.',
  },
  {
    name: '恋爱智商测试',
    times: 1111,
    cover: Cover,
    desc: '111111',
  },
  {
    name: '恋爱智商测试',
    times: 1111,
    cover: Cover,
    desc: '111111',
  },
  {
    name: '恋爱智商测试',
    times: 1111,
    cover: Cover,
    desc: '111111',
  },
  {
    name: '恋爱智商测试',
    times: 1111,
    cover: Cover,
    desc: '111111',
  },
  {
    name: '恋爱智商测试',
    times: 1111,
    cover: Cover,
    desc: '111111',
  },
  {
    name: '恋爱智商测试',
    times: 1111,
    cover: Cover,
    desc: '111111',
  },
  {
    name: '恋爱智商测试',
    times: 1111,
    cover: Cover,
    desc: '111111',
  },
  {
    name: '恋爱智商测试',
    times: 1111,
    cover: Cover,
    desc: '111111',
  },
];

function Testing() {
  return (
    <div className={styles['testing']}>
      <p className={styles['testing-title']}>心理测试</p>
      <p className={styles['testing-desc']}>认识自己，了解他人</p>
      <div className={styles['testing-box']}>
        {testings.map((i, index) => (
          <Card
            className={styles['testing-item']}
            key={index}
            hoverable
            cover={<Image src={i.cover} alt="" layout="responsive" />}
          >
            <div className={styles['testing-button']}>去测试</div>
            <div className={styles['testing-item-name']}>{i.name}</div>
            <div className={styles['testing-item-extend']}>
              <div className={styles['testing-item-times']}>
                {i.times}人测试过
              </div>
            </div>
            <div className={styles['testing-item-desc']}>{i.desc}</div>
            {/* <Card.Meta title={i.name} description={`${i.times}人测试过`} /> */}
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Testing;
