import React from 'react';
import styles from './banner.module.scss';
import { Carousel } from 'antd';
import Banner1Image from 'assets/images/banner/banner1.jpg';
import Banner2Image from 'assets/images/banner/banner2.png';
import Banner3Image from 'assets/images/banner/banner3.jpg';
import Image from 'next/image';

const banners = [
  {
    image: Banner1Image,
  },
  {
    image: Banner2Image,
  },
  {
    image: Banner3Image,
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
