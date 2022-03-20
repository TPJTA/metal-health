import React from 'react';
import styles from './testing.module.scss';

function Testing() {
  return (
    <div className={styles['testing']}>
      <p className={styles['testing-title']}>获取真实的健康故事。</p>
      <p className={styles['testing-desc']}>
        无论您处于健康之旅的哪个阶段，您都会在 The Mighty
        上找到同样经历过的人的故事。
      </p>
    </div>
  );
}

export default Testing;
