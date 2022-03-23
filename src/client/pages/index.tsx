import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Header from '@/components/header';
import Banner from '@/components/homePage/banner';
import styles from '@/styles/index.module.scss';
import Story from '@/components/homePage/story';
import Testing from '@/components/homePage/testing';

const Home: NextPage = function () {
  return (
    <div className={styles['main']}>
      <Head>
        <title>首页</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Header />
      <Banner />
      <Story />
      <div className={styles['section-seperator']} />
      <Testing />
    </div>
  );
};

export default Home;
