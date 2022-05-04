import React from 'react';
import {
  DownOutlined,
  UpOutlined,
  RightOutlined,
  MinusOutlined,
} from '@ant-design/icons';
import styles from './analyseItem.module.scss';

interface mainItemTy {
  icon: React.ReactNode;
  color: string;
  title: string;
  number: number;
  rate: number;
}
const AnalyseItem: React.FC<
  mainItemTy &
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >
> = function ({ icon, color, title, number, rate, ...prps }) {
  const getRateWords = (rate: number): React.ReactNode => {
    if (rate > 0) {
      return (
        <span>
          <UpOutlined style={{ color: '#f81d22' }} /> +{(rate * 100).toFixed(2)}
          % 增长
        </span>
      );
    } else if (rate === 0) {
      return (
        <span>
          <MinusOutlined style={{ color: '#888888' }} />{' '}
          {(rate * 100).toFixed(2)}% 不变
        </span>
      );
    } else if (rate < 0) {
      return (
        <span>
          <DownOutlined style={{ color: '#0b8235' }} />{' '}
          {(rate * 100).toFixed(2)}% 减少
        </span>
      );
    }
  };
  return (
    <div className={styles['main-item']} style={{ color: color }} {...prps}>
      <div className={styles['main-item-icon']} style={{ borderColor: color }}>
        {icon}
      </div>
      <div className={styles['main-item-context']}>
        <div className={styles['main-item-context-title']}>{title}</div>
        <div className={styles['main-item-context-number']}>{number}</div>
        <div
          className={styles['main-item-context-rate']}
          style={{ color: '#000' }}
        >
          {getRateWords(rate)}
        </div>
      </div>
      <RightOutlined className={styles['main-next-icon']} />
    </div>
  );
};
export default AnalyseItem;
