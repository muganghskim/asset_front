import React, { useEffect, useRef, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DonutChartProps {
  tasks: { label: string; value: number }[];
}

const DonutChart: React.FC<DonutChartProps> = ({ tasks }) => {

  // 툴팁 유지를 위한 useRef -> datalables 사용 후 폐기됨
  const chartRef = useRef<ChartJS<'doughnut'> | null>(null);
  // 총금액 표시를 위한 useState todo: 각각의 데이터들과 묶어서 리코일 상태관리로 백엔드에 전달 할듯?
  const [totalValue, setTotalValue] = useState(0);
  
  // 총금액 표시를 위한 useEffect task가 추가된 경우 렌더링
  useEffect(() => {
    const sumValue = tasks.reduce((sum, task) => sum + task.value, 0);
    setTotalValue(sumValue);
  }, [tasks]);

  // 도넛 차트에 추가될 데이터
  const data = {
    labels: tasks.map(task => task.label),
    datasets: [
      {
        label: 'Tasks',
        data: tasks.map(task => task.value),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // 도넛 차트 속성 적용
  const options = {
    responsive: true,
    plugins: {
      // 태그 속성
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 16, // 텍스트 크기 조정
          },
        },
      },
      // 제목 속성
      title: {
        display: true,
        text: 'Task Distribution',
        font: {
          size: 20, // 텍스트 크기 조정
        },
      },
      // 데이터 레이블로 툴팁 대체
      datalabels: {
        display: true,
        color: 'black',
        formatter: (value: any, context: any) => {
            // 데이터 라벨을 설정하는 코드를 여기에 추가
            const percentage = ((value / totalValue) * 100).toFixed(1);
            return `${context.dataset.label}: ${numberToKorean(parseInt(value))}원 (${percentage}%)`; // 예시 코드
        }
      },
      // 툴팁 속성 폐기
      tooltip: {
        enabled: false, // 툴팁 비활성화
        // mode: 'point', // 또는 'point'
        // intersect: null, // 클릭 이벤트에 대해 툴팁 표시 비활성화
        // callbacks: {
        //     title: () => {
        //         const totalValue = tasks.reduce((sum, task) => sum + task.value, 0);
        //         return `총합: ${totalValue}`; // 툴팁의 제목에 총합 표시
        //       },
        //     label: (tooltipItem: any) => {
        //       return `${tooltipItem.label}: ${tooltipItem.raw}`;
        //     },
        //   },
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // 배경색
        titleColor: 'white', // 제목 색상
        bodyColor: 'white', // 본문 색상
        titleFont: {
          size: 16, // 제목 폰트 크기
        },
        bodyFont: {
          size: 14, // 본문 폰트 크기
        },
      },
    //   // 상호작용 속성
    //   interaction: {
    //     mode: 'index',
    //     intersect: false
    //     /* nearest: 가장 가까운 데이터 포인트와의 상호 작용을 강조합니다. 이 모드에서 툴팁은 마우스 커서에 가장 가까운 데이터 포인트에 표시됩니다. 차트 요소와의 거리에 따라 다른 동작을 수행합니다.

    //     point: 데이터 포인트와의 상호 작용을 강조합니다. 이 모드에서는 차트의 모든 데이터 포인트에 대한 정보가 표시됩니다. 이 모드를 사용하면 툴팁이 데이터 포인트에 직접 표시됩니다.
        
    //     index: 해당 인덱스의 모든 데이터 포인트와의 상호 작용을 강조합니다. 이 모드에서는 특정 인덱스에 해당하는 모든 데이터 포인트가 강조됩니다. 이 모드를 사용하면 툴팁이 해당 인덱스에 속한 모든 데이터 포인트에 표시됩니다.
        
    //     dataset: 해당 데이터셋과의 상호 작용을 강조합니다. 이 모드에서는 특정 데이터셋에 속한 모든 데이터 포인트가 강조됩니다. 이 모드를 사용하면 툴팁이 해당 데이터셋에 속한 모든 데이터 포인트에 표시됩니다. */
    //   },
      // 라인 차트 생성 시 유용한 옵션들
      // 마우스 휠 및 핀치 제스처로 차트 확대/축소 가능하도록 설정합니다.
    //   zoom: {
    //     zoom: {
    //       wheel: {
    //         enabled: true,
    //       },
    //       pinch: {
    //         enabled: true,
    //       },
    //       mode: 'xy',
    //     },
    //     // 차트 이동을 가능하게 합니다.
    //     pan: {
    //       enabled: true,
    //       mode: 'xy',
    //     },
    //   },
    //   // 데이터 포인트를 드래그하여 이동할 수 있도록 설정합니다.
    //   dragData: {
    //     enabled: true,
    //   },
    //   // 데이터 포인트를 드래그하면 해당 데이터를 변경할 수 있도록 설정합니다. 또한, 드래그하는 동안 툴팁을 표시합니다.
    //   dragDataPoint: {
    //     backgroundColor: 'rgba(255, 0, 0, 0.5)',
    //     borderColor: 'red',
    //     borderWidth: 2,
    //     radius: 10,
    //     showTooltip: true,
    //   },
    //   // 차트에서 x축 방향으로 영역을 선택할 수 있도록 설정합니다.
    //   selection: {
    //     mode: 'x',
    //   },
    //   // 차트의 크기를 조정할 수 있도록 설정합니다.
    //   resize: {
    //     enabled: true,
    //   },
    },
  };

//   // 툴팁을 보여주기 위한 함수
//   const showTooltip = () => {
//     const chartInstance = chartRef.current;
//     if (chartInstance) {
//         if (chartInstance.tooltip) {
//             chartInstance.tooltip.setActiveElements(
//                 tasks.map((task, index) => ({ datasetIndex: 0, index })),
//                 { x: 0, y: 0 }
//             );
//         chartInstance.update();
//         }
//     }
//   };

//   // 툴팁 표시
//   useEffect(() => {
//     const chartInstance = chartRef.current;

//     if (chartInstance) {
//       setTimeout(showTooltip, 1000); // 1초 후에 툴팁을 강제로 표시
//     }
//   }, [tasks]);

// 한글 금액으로 변환
function numberToKorean(number: any){
    var inputNumber  = number < 0 ? false : number;
    var unitWords    = ['', '만', '억', '조', '경'];
    var splitUnit    = 10000;
    var splitCount   = unitWords.length;
    var resultArray  = [];
    var resultString = '';

    for (var i = 0; i < splitCount; i++){
         var unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
        unitResult = Math.floor(unitResult);
        if (unitResult > 0){
            resultArray[i] = unitResult;
        }
    }

    for (var i = 0; i < resultArray.length; i++){
        if(!resultArray[i]) continue;
        resultString = String(resultArray[i]) + unitWords[i] + resultString;
    }

    return resultString;
}

// 한글 금액으로 변환 + 3자리 마다 , 찍기
// function numberFormat(x) {
//     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }

// function numberToKorean(number){
//     var inputNumber  = number < 0 ? false : number;
//     var unitWords    = ['', '만', '억', '조', '경'];
//     var splitUnit    = 10000;
//     var splitCount   = unitWords.length;
//     var resultArray  = [];
//     var resultString = '';

//     for (var i = 0; i < splitCount; i++){
//         var unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
//         unitResult = Math.floor(unitResult);
//         if (unitResult > 0){
//             resultArray[i] = unitResult;
//         }
//     }

//     for (var i = 0; i < resultArray.length; i++){
//         if(!resultArray[i]) continue;
//         resultString = String(numberFormat(resultArray[i])) + unitWords[i] + resultString;
//     }

//     return resultString;
// }



  

  return (
    <div className="w-1/2 h-1/2">
        {/* 도넛 차트에 각종 데이터, 속성, 플러그인 주입 */}
        <Doughnut ref={chartRef} data={data} options={options} plugins={[ChartDataLabels]} />
        <div>총합: {numberToKorean(totalValue)}원</div>
    </div>
    )
};

export default DonutChart;
