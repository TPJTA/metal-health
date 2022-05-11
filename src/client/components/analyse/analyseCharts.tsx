import React, { useEffect, useState } from 'react';
import styles from './analyseCharts.module.scss';
import classNames from 'classnames';
import ReactECharts from 'echarts-for-react';
import { EChartsOption, ECharts } from 'echarts';

type statType = {
  timestamp: any[];
  showData: any[];
  curData: string;
};
// eslint-disable-next-line @typescript-eslint/ban-types
interface AnalysehartsProps {
  xName: string;
  yName: string;
  stat: Record<string, unknown> & statType;
  className?: string;
  option?: EChartsOption;
}

const Analyseharts: React.FC<AnalysehartsProps> = function ({
  className,
  xName,
  yName,
  stat,
  option,
}) {
  const [chart, setChart] = useState<ECharts>();

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
    <div className={classNames(styles['analyse-charts-box'], className)}>
      <div className={styles['analyse-charts-words']}>
        <div className={styles['analyse-charts-title']}>当前{yName}</div>
        <div className={styles['analyse-charts-num']}>{stat.curData}</div>
      </div>
      <ReactECharts
        className={styles['analyse-charts']}
        onChartReady={(chart) => setChart(chart)}
        option={{
          grid: { top: 8, right: 8, bottom: 24, left: 36 },
          dataset: {
            source: stat,
          },
          xAxis: {
            name: xName,
            type: 'category',
            nameLocation: 'end',
          },
          yAxis: {
            type: 'value',
          },
          dataZoom: {
            type: 'inside',
            startValue:
              stat.showData.length - 7 < 0 ? 0 : stat.showData.length - 7,
            maxValueSpan: stat.showData.length,
          },
          animationDurationUpdate: 150,
          series: [
            {
              name: yName,
              type: 'line',
              smooth: true,
            },
          ],
          tooltip: {
            trigger: 'axis',
          },
          ...option,
        }}
      />
    </div>
  );
};

export default Analyseharts;
