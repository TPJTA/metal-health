import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Hello from '../components/hello';

const Home: NextPage = function () {
  return (
    <div>
      <Head>
        <title>test</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Hello />
    </div>
  );
};

export default Home;
