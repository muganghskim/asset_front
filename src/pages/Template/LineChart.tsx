import React from 'react';
import { Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LinearScale, CategoryScale, PointElement, LineElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, LinearScale, CategoryScale, PointElement, LineElement);

// interface LineChartProps {
  
// }

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
      },
    ],
  };
  
const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
        datalabels: {
            align: 'end' as 'end', // 레이블을 데이터 포인트의 끝에 맞춥니다.
            anchor: 'end' as 'end', // 레이블을 데이터 포인트의 끝에 고정시킵니다.
            offset: 4, // 레이블 위치를 조정합니다 (데이터 포인트 위로 4픽셀).
            formatter: (value: number) => value.toString(), // 레이블 형식을 사용자 정의합니다.
        },
      },
  };

const LineChart: React.FC = () => {
  return (
    <div className="line-chart w-1/2 h-1/2">
      <Line data={data} options={options} plugins={[ChartDataLabels]} />
    </div>
  );
};

export default LineChart;
