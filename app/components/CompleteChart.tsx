"use client";
import { useEffect } from 'react';
import * as echarts from 'echarts';

interface ChartProps {
  foodDebt: number;
  leisureDebt: number;
  transportDebt: number;
  studyDebt: number;
  healthDebt: number;
}

const Chart: React.FC<ChartProps> = ({ foodDebt, leisureDebt, transportDebt, studyDebt, healthDebt }) => {
  let totalChart = 6000 - (foodDebt + leisureDebt + transportDebt + studyDebt + healthDebt );
  var chartHeight = '600px';
  var chartWidth = '600px';
  
  useEffect(() => {

    if (window.screen.width > 900){
      chartHeight = '400px';
      chartWidth = '400px';
    }

    const initChart = () => {
      const chartDom = document.getElementById(`total-chart`);
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
                { value: totalChart, name: 'Rest Value' },
                { value: foodDebt, name: 'Food' },
                { value: leisureDebt, name: 'Leisure' },
                { value: transportDebt, name: 'Transport' },
                { value: studyDebt, name: 'Study' },
                { value: healthDebt, name: 'Health' }
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
  }, [foodDebt, leisureDebt, transportDebt, studyDebt, healthDebt]);

  return (
    <div className="flex-col text-center">
      <h1 className="text-2xl">Total</h1>
      <div id="total-chart" className="flex" style={{ height: chartHeight , width: chartWidth }}></div>
    </div>
  );
};

export default Chart;
