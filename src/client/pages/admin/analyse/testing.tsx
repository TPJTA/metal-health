import React, { useEffect, useMemo, useState } from 'react';
import ReactECharts, { EChartsReactProps } from 'echarts-for-react';
import type { EChartsOption, ECharts } from 'echarts';
import useApi from '@/api/hook';
import type {
  AnalyseDetail,
  AnalyseTesting,
  AnalyseTestingResult,
} from '@/api/analyse';
import type { TestingListType } from '@/api/testing';
import styles from '@/styles/analyse.module.scss';
import { LeftOutlined } from '@ant-design/icons';
import { Button, Tabs, Select } from 'antd';
import { useRouter } from 'next/router';
import { HTMLToText } from '@/libs/tool';

const { TabPane } = Tabs;

function Testing() {
  const router = useRouter();

  return (
    <div className={styles['testing-analyse']}>
      <Tabs defaultActiveKey="1" centered className={styles['testing-tabs']}>
        <TabPane tab="测评量" key="1" className={styles['testing-tab-pan']}>
          <TesingNumChart />
        </TabPane>
        <TabPane tab="测试类型" key="2" className={styles['testing-tab-pan']}>
          <TestingTypeChart />
        </TabPane>
        <TabPane tab="测评问题" key="3" className={styles['testing-tab-pan']}>
          <TestingResult />
        </TabPane>
      </Tabs>
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

const TesingNumChart = () => {
  const { getAnalyseDetail } = useApi('getAnalyseDetail');
  const [visiteData, setVisiteData] = useState<AnalyseDetail>([]);
  const [chart, setChart] = useState<ECharts>();
  useEffect(() => {
    getAnalyseDetail('testing').then((res) => setVisiteData(res.data));
  }, [getAnalyseDetail]);
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
        text: '近七天测评量',
        left: '44.5%',
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
          name: '测评量',
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

  return (
    <ReactECharts
      onChartReady={(chart) => {
        setChart(chart);
        chart.resize();
      }}
      style={{ height: 600 }}
      option={option}
    />
  );
};

const TestingTypeChart = () => {
  const { getAnalyseTesting } = useApi('getAnalyseTesting');
  const [chart, setChart] = useState<ECharts>();
  const [testingData, setTestingData] = useState<AnalyseTesting>([]);

  useEffect(() => {
    getAnalyseTesting().then((res) => setTestingData(res.data));
  }, [getAnalyseTesting]);

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
    const typeMap = ['健康', '性格', '社交', '能力'];
    const data = testingData.map((item) => {
      return {
        value: item.sum,
        name: typeMap[item.type],
      };
    });

    return {
      title: {
        text: '测试类型占比',
        left: '44.5%',
        textStyle: {
          fontSize: 30,
        },
      },
      grid: {
        top: 100,
      },
      tooltip: {},
      series: [
        {
          name: '测试类型',
          type: 'pie',
          radius: '80%',
          data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  }, [testingData]);
  return (
    <ReactECharts
      onChartReady={(chart) => {
        setChart(chart);
        chart.resize();
      }}
      style={{ height: 600 }}
      option={option}
    />
  );
};

const TestingResult = () => {
  const [chart, setChart] = useState<ECharts>();
  const { getAnalyseTestingResult, getTestingList } = useApi(
    'getAnalyseTestingResult',
    'getTestingList',
  );
  const [testingList, setTetsingList] =
    useState<Array<{ label: string; value: number }>>();
  const [selectId, setSelectId] = useState<number>();
  const [showData, setShowData] = useState<AnalyseTestingResult>([]);

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

  useEffect(() => {
    getTestingList({}).then((res) => {
      setTetsingList(
        res.data.map((item) => ({
          label: item.name,
          value: item.id,
        })),
      );
      setSelectId(res.data[0].id);
    });
  }, [getTestingList]);

  useEffect(() => {
    if (selectId) {
      getAnalyseTestingResult(selectId.toString()).then((res) => {
        setShowData(res.data);
        console.log(res.data);
      });
    }
  }, [selectId, getAnalyseTestingResult]);

  const option = useMemo<EChartsOption>(() => {
    const data = showData.map((item) => {
      return {
        value: item.times,
        name: HTMLToText(item.desc),
      };
    });

    return {
      title: {
        text: '测试回答占比',
        left: '44.5%',
        textStyle: {
          fontSize: 30,
        },
      },
      grid: {
        top: 100,
      },
      tooltip: {
        confine: true,
        className: 'testing-tooltip',
      },
      series: [
        {
          name: '测试回答',
          type: 'pie',
          radius: '80%',
          data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  }, [showData]);

  return (
    <React.Fragment>
      <Select
        className={styles['testing-select']}
        value={selectId}
        options={testingList}
        onChange={(val) => setSelectId(val)}
      />
      <ReactECharts
        onChartReady={(chart) => {
          setChart(chart);
          chart.resize();
        }}
        style={{ height: 600 }}
        option={option}
      />
    </React.Fragment>
  );
};

export default Testing;
