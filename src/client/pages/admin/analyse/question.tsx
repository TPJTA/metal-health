import React, { useEffect, useMemo, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import type { EChartsOption, ECharts } from 'echarts';
import useApi from '@/api/hook';
import type { AnalyseDetail } from '@/api/analyse';
import styles from '@/styles/analyse.module.scss';
import { LeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRouter } from 'next/router';

function Question() {
  const router = useRouter();
  const [chart, setChart] = useState<ECharts>();
  const { getAnalyseDetail } = useApi('getAnalyseDetail');
  const [visiteData, setVisiteData] = useState<AnalyseDetail>([]);

  useEffect(() => {
    getAnalyseDetail('question').then((res) => setVisiteData(res.data));
  }, [getAnalyseDetail]);

  useEffect(() => {
    const resizeFn = () => {
      if (chart) {
        chart.resize();
      }
    };
    window.addEventListener('resize', resizeFn);
    return () => {
      window.removeEventListener('resize', resizeFn);
    };
  }, [chart]);

  const option = useMemo<EChartsOption>(() => {
    const source: { create: any[]; times: any[] } = {
      create: [],
      times: [],
    };
    visiteData.forEach((item) => {
      source.create.unshift(item.createTime);
      source.times.unshift(item.times);
    });

    return {
      title: {
        text: '近七天提问量',
        right: '50%',
        textStyle: {
          fontSize: 30,
        },
      },
      grid: {
        top: 100,
      },
      xAxis: {
        name: '时间',
        type: 'category',
        nameLocation: 'end',
        data: source.create,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '提问量',
          type: 'bar',
          smooth: true,
          data: source.times,
        },
      ],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
    };
  }, [visiteData]);

  return (
    <div className={styles['visite-analyse']}>
      <ReactECharts
        onChartReady={(chart) => {
          setChart(chart);
          chart.resize();
        }}
        style={{ height: 700 }}
        option={option}
        className={styles['visite-analyse-chart']}
      />
      <Button
        onClick={() => router.back()}
        className={styles['back-button']}
        type="link"
        icon={<LeftOutlined />}
      >
        返回
      </Button>
    </div>
  );
}

export default Question;
