"use client";
import { useEffect, useState } from 'react';
import * as echarts from 'echarts';

interface ChartProps {
  debt: number;
  total: number;
  title: string;
}

const Chart: React.FC<ChartProps> = ({ debt, total, title }) => {
  useEffect(() => {
    const initChart = () => {
      const chartDom = document.getElementById(`${title}-chart`);
      if (chartDom) {
        const myChart = echarts.init(chartDom);
        const option = {
          tooltip: {
            trigger: 'item'
          },
          legend: {
            top: '5%',
            left: 'center'
          },
          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: 40,
                  fontWeight: 'bold'
                }
              },
              labelLine: {
                show: false
              },
              data: [
                { value: debt, name: 'Debts' },
                { value: total - debt, name: 'Remaining Value' }
              ]
            }
          ]
        };
        myChart.setOption(option);
      } else {
        console.error("chartDom is null");
      }
    };

    initChart();
  }, [debt, total, title]);

  return (
    <div className="flex-col text-center">
      <h1 className="text-2xl">{title}</h1>
      <div id={`${title}-chart`} className="flex" style={{ height: '600px', width: '600px' }}></div>
    </div>
  );
};

export default Chart;
