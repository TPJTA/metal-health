import React, { useEffect, useMemo, useState, useReducer, useRef } from 'react';
import Script from 'next/script';
import Analyseharts from '@/components/analyse/analyseCharts';
import AnalyseItem from '@/components/analyse/analyseItem';
import { UserOutlined, EditOutlined, CommentOutlined } from '@ant-design/icons';
import styles from '@/styles/analyse.module.scss';
import moment from 'moment';
import type { Socket } from 'socket.io-client';
import useApi from '@/api/hook';
import type { Analyse } from '@/api/analyse';
import Link from 'next/link';

type StatType = {
  timestamp: any[];
  showData: any[];
  curData: string;
};
function Analyse() {
  const { getAnalyse } = useApi('getAnalyse');

  const [analyse, setAnalyse] = useState<Analyse>({
    visite: {
      num: 0,
      rate: 0,
    },
    testing: {
      num: 0,
      rate: 0,
    },
    question: {
      num: 0,
      rate: 0,
    },
  });

  const [cpuStat, setCpuStat] = useState<StatType>({
    timestamp: [],
    showData: [],
    curData: '0%',
  });

  const [memStat, setMemStat] = useState<StatType>({
    timestamp: [],
    showData: [],
    curData: '0MB',
  });

  const [responseTimeStat, setResponseTimeStat] = useState<StatType>({
    timestamp: [],
    showData: [],
    curData: '0ms',
  });

  const [responseStat, setResponseStat] = useState<
    StatType & { showData1: any[]; showData2: any[]; showData3: any[] }
  >({
    timestamp: [],
    showData: [],
    showData1: [],
    showData2: [],
    showData3: [],
    curData: '0',
  });

  const setStat = (
    stat: StatType,
    setStat: React.Dispatch<React.SetStateAction<StatType>>,
    {
      data,
      timestamp,
      render,
    }: { data: number; timestamp: any; render: (data: any) => string },
  ) => {
    if (stat.showData.length > 50) {
      stat.showData.shift();
      stat.timestamp.shift();
    }
    stat.showData.push(data);
    stat.timestamp.push(moment(timestamp).format('HH:mm:ss.SS'));
    setStat({
      showData: stat.showData,
      timestamp: stat.timestamp,
      curData: render(data),
    });
  };

  useEffect(() => {
    let socket: Socket;
    const openSocket = () => {
      if (!window.io) {
        window.setTimeout(openSocket, 100);
        return;
      }
      socket = window.io('ws://localhost:3012', { path: '/socket.io' });
      socket.on('esm_stats', function (data) {
        const { os, responses } = data;
        if (
          os?.timestamp !== undefined &&
          os?.cpu !== undefined &&
          os?.cpu <= 100
        ) {
          setStat(cpuStat, setCpuStat, {
            timestamp: os.timestamp,
            data: os.cpu,
            render: (data) => data.toFixed(1) + '%',
          });
        }
        if (os?.timestamp !== undefined && os?.memory !== undefined) {
          setStat(memStat, setMemStat, {
            timestamp: os.timestamp,
            data: os.memory.toFixed(2),
            render: (data) => data + 'MB',
          });
        }
        if (os?.timestamp !== undefined && responses?.mean !== undefined) {
          setStat(responseTimeStat, setResponseTimeStat, {
            timestamp: os.timestamp,
            data: responses.mean.toFixed(2),
            render: (data) => data + 'ms',
          });
        }

        if (responses?.timestamp !== undefined) {
          if (responseStat.showData.length > 50) {
            responseStat.timestamp.shift();
            responseStat.showData.shift();
            responseStat.showData1.shift();
            responseStat.showData2.shift();
            responseStat.showData3.shift();
          }
          const time = moment(responses.timestamp).format('HH:mm:ss.SS');

          if (!responseStat.timestamp.find((i) => i === time)) {
            responseStat.timestamp.push(time);
            responseStat.showData.push(responses['2']);
            responseStat.showData1.push(responses['3']);
            responseStat.showData2.push(responses['4']);
            responseStat.showData3.push(responses['5']);
            responseStat.curData = responses.count;
            setResponseStat({ ...responseStat });
          }
        }
      });
    };
    openSocket();
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []);

  useEffect(() => {
    getAnalyse().then((res) => {
      setAnalyse(res.data);
    });
  }, [getAnalyse]);

  return (
    <div className={styles['analyse-page']}>
      <Script
        strategy="beforeInteractive"
        src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.5/socket.io.min.js"
      />
      <div className={styles['analyse-header']}>
        <Link href="/admin/analyse/visite" passHref>
          <AnalyseItem
            title="近期访问量"
            number={analyse.visite.num}
            rate={analyse.visite.rate}
            color="#1296db"
            icon={<UserOutlined />}
          />
        </Link>
        <Link href="/admin/analyse/testing" passHref>
          <AnalyseItem
            title="近期测评量"
            number={analyse.testing.num}
            rate={analyse.testing.rate}
            color="rgb(252, 126, 0)"
            icon={<EditOutlined />}
          />
        </Link>
        <Link href="/admin/analyse/question" passHref>
          <AnalyseItem
            title="近期询问量"
            number={analyse.question.num}
            rate={analyse.question.rate}
            color="#0e932e"
            icon={<CommentOutlined />}
          />
        </Link>
      </div>

      <div className={styles['analyse-chart']}>
        <Analyseharts
          className={styles['analyse-chart-item']}
          xName="时间"
          yName="cpu负载"
          stat={cpuStat}
        />
        <Analyseharts
          className={styles['analyse-chart-item']}
          xName="时间"
          yName="内存占用"
          stat={memStat}
        />
        <Analyseharts
          className={styles['analyse-chart-item']}
          xName="时间"
          yName="响应时间"
          stat={responseTimeStat}
        />
        <Analyseharts
          className={styles['analyse-chart-item']}
          xName="时间"
          yName="请求数量"
          stat={responseStat}
          option={{
            grid: { top: 40, right: 8, bottom: 24, left: 36 },
            color: ['#75D701', '#47b8e0', '#ffc952', '#E53A40'],
            legend: {
              top: 0,
              show: true,
            },
            series: [
              {
                name: '200',
                type: 'line',
                smooth: true,
              },
              {
                name: '300',
                type: 'line',
                smooth: true,
              },
              {
                name: '400',
                type: 'line',
                smooth: true,
              },
              {
                name: '500',
                type: 'line',
                smooth: true,
              },
            ],
          }}
        />
      </div>
    </div>
  );
}

export default Analyse;
