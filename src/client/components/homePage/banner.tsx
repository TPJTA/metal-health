import React from 'react';
import styles from './banner.module.scss';
import { Carousel } from 'antd';
import Banner1Image from 'assets/images/banner/banner1.jpeg';
import Banner2Image from 'assets/images/banner/banner2.jpeg';

const banners = [
  {
    image: Banner1Image,
  },
  {
    image: Banner2Image,
  },
];

function Banner() {
  return (
    <Carousel autoplay dots className={styles['banner']}>
      {banners.map((i, index) => (
        <div key={index}>
          <div
            className={styles['banner-image']}
            style={{ backgroundImage: `url("${i.image.src}")` }}
          />
        </div>
      ))}
    </Carousel>
  );
}

export default Banner;
