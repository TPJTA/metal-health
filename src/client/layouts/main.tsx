import React from 'react';
import Header from '@/components/header';
import styles from './main.module.scss';

const MainLayout: React.FC<{ children: React.ReactNode }> = function ({
  children,
}) {
  return (
    <div key="main" className={styles['main-layout']}>
      <Header />
      {children}
    </div>
  );
};

export default MainLayout;
