import React, { useState, useEffect, useMemo } from 'react';
import styles from '@/styles/testing.module.scss';
import useApi from '@/api/hook';
import { useRouter } from 'next/router';
import type { TestingQustion } from '@/api/testing';
import {
  Progress,
  Radio,
  Button,
  Space,
  RadioGroupProps,
  Skeleton,
} from 'antd';
import Image from 'next/image';

function Question() {
  const router = useRouter();
  const [curQuestionIndex, setCurQuestionIndex] = useState(0);
  const [questionData, setQuestionData] = useState<TestingQustion>();
  const [scoreArr, setScoreArr] = useState<number[]>([]);
  const { getTestingQustion } = useApi('getTestingQustion');

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      getTestingQustion(id as string)
        .then((res) => {
          if (res.data) {
            setQuestionData(res.data);
            setScoreArr(new Array(res.data.questions.length).fill(0));
          } else {
            router.replace('/404');
          }
        })
        .catch(() => {
          router.replace('/404');
        });
    }
  }, [router, getTestingQustion]);

  const selectAns: RadioGroupProps['onChange'] = (e) => {
    const score =
      questionData?.questions[curQuestionIndex].answers[e.target.value].score;
    if (score !== undefined) {
      setTimeout(() => {
        scoreArr[curQuestionIndex] = score;
        setScoreArr(scoreArr);
        setCurQuestionIndex(curQuestionIndex + 1);
      }, 200);
    }
  };

  const previousQuestion = () => {
    scoreArr[curQuestionIndex - 1] = 0;
    setScoreArr(scoreArr);
    setCurQuestionIndex(curQuestionIndex - 1);
  };

  const restart = () => {
    scoreArr.fill(0);
    setScoreArr(scoreArr);
    setCurQuestionIndex(0);
  };

  return (
    <div className={styles['tesing-question']}>
      <div className={styles['testing-question-box']}>
        <div className={styles['testing-qustion-title']}>
          {questionData?.name}
        </div>
        {questionData && curQuestionIndex >= questionData.questions.length ? (
          <TestingResult id={router.query.id as string} scoreArr={scoreArr} />
        ) : (
          <div className={styles['testing-question-content']}>
            <div className={styles['testing-question-progress']}>
              <Progress
                percent={
                  questionData
                    ? (curQuestionIndex / questionData.questions.length) * 100
                    : 0
                }
                showInfo={false}
              />
              <div className={styles['testing-question-progress-words']}>
                <span>{curQuestionIndex + 1}</span>/
                {questionData?.questions.length}
              </div>
            </div>
            <div className={styles['testing-question-item']}>
              <div className={styles['testing-question-item-name']}>
                {questionData?.questions[curQuestionIndex].title}
              </div>
              {questionData?.questions[curQuestionIndex].img && (
                <div className={styles['testing-question-item-img']}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_ORIGIN}${questionData?.questions[curQuestionIndex].img}`}
                    layout="fill"
                    alt=""
                  />
                </div>
              )}
              <Radio.Group
                size="large"
                onChange={selectAns}
                key={curQuestionIndex}
              >
                <Space direction="vertical">
                  {questionData?.questions[curQuestionIndex].answers.map(
                    (item, index) => (
                      <Radio
                        key={index}
                        value={index}
                        className={styles['testing-question-radio']}
                      >
                        {item.title}
                      </Radio>
                    ),
                  )}
                </Space>
              </Radio.Group>
              <div className={styles['testing-question-button-box']}>
                <Button
                  size="large"
                  type="primary"
                  className={styles['testing-question-button']}
                  shape="round"
                  onClick={restart}
                >
                  ????????????
                </Button>
                {curQuestionIndex !== 0 && (
                  <Button
                    size="large"
                    type="primary"
                    className={styles['testing-question-button']}
                    shape="round"
                    onClick={previousQuestion}
                  >
                    ?????????
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const TestingResult: React.FC<{
  id: string;
  scoreArr: number[];
}> = ({ scoreArr, id }) => {
  const [result, setResult] = useState<{ resultStr: string; result: string }>();
  const score = useMemo(() => scoreArr.reduce((p, c) => p + c), [scoreArr]);
  const { getTestRes } = useApi('getTestRes');
  useEffect(() => {
    console.log(1);

    getTestRes(id, score).then((res) => {
      setResult(res.data);
    });
  }, [getTestRes, score, id]);

  return (
    <div className={styles['testing-result']}>
      <Skeleton
        className={styles['testing-skeleton']}
        paragraph={{ rows: 20 }}
        active
        loading={!result}
      >
        <div className={styles['testing-result-content']}>
          <div className={styles['testing-result-title']}>????????????</div>
          <div className={styles['testing-result-score']}>
            ???????????????:{' '}
            <span className={styles['testing-result-score-num']}>{score}</span>
          </div>
          <div
            className={styles['testing-result-desc']}
            dangerouslySetInnerHTML={{ __html: result?.result ?? '' }}
          />
        </div>
        <div className={styles['testing-result-analysis']}>
          <div className={styles['testing-result-title']}>????????????</div>
          <div
            className={styles['testing-result-analysis-content']}
            dangerouslySetInnerHTML={{ __html: result?.resultStr ?? '' }}
          />
        </div>
      </Skeleton>
    </div>
  );
};

export default Question;
