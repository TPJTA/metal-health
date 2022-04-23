import React, { useEffect, useState } from 'react';
import styles from '@/styles/testing.module.scss';
import type { TestingType } from '@/api/testing';
import { useRouter } from 'next/router';
import useApi from '@/api/hook';
import Image from 'next/image';
import { Button, Skeleton } from 'antd';
import { TeamOutlined } from '@ant-design/icons';

function TestingItem() {
  const router = useRouter();
  const [testingData, setTestingData] = useState<TestingType>();
  const { getTesting } = useApi('getTesting');

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      getTesting(id as string)
        .then((res) => {
          if (res.data) {
            setTestingData(res.data);
          } else {
            router.replace('/404');
          }
        })
        .catch(() => {
          router.replace('/404');
        });
    }
  }, [router, getTesting]);

  const startTesting = () => {
    const { id } = router.query;
    router.push(`/testing/${id}/question`);
  };

  return (
    <div className={styles['testing-item-page']}>
      <div className={styles['testing-item-page-box']}>
        <Skeleton
          className={styles['testing-skeleton']}
          paragraph={{ rows: 20 }}
          active
          loading={!testingData}
        >
          <div className={styles['testing-section']}>
            <div className={styles['testing-title']}>{testingData?.name}</div>
            <div className={styles['testing-cover']}>
              {testingData?.cover && (
                <Image
                  src={process.env.NEXT_PUBLIC_ORIGIN + testingData.cover}
                  alt=""
                  layout="fill"
                />
              )}
            </div>
            <div className={styles['testing-extra']}>
              <TeamOutlined />
              {testingData?.times}人已测
            </div>
            <Button
              className={styles['testing-button']}
              type="primary"
              size="large"
              shape="round"
              onClick={startTesting}
            >
              开始测试
            </Button>
          </div>
          <div className={styles['testing-section']}>
            <div className={styles['testing-title']}>测评介绍</div>
            <div
              className={styles['testing-desc']}
              dangerouslySetInnerHTML={{ __html: testingData?.desc ?? '' }}
            />
          </div>
        </Skeleton>
      </div>
    </div>
  );
}

export default TestingItem;
