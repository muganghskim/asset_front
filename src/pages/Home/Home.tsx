import React, { useState } from 'react';
import DonutChart from '../Template/DonutChart';
import LineChart from '../Template/LineChart';

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<{ label: string; value: number }[]>([]);
  const [taskName, setTaskName] = useState('');
  const [taskValue, setTaskValue] = useState<string>('');
  const taskOptions = ['부동산', '채권', '주식', '원자재', '암호화폐', '현금', 'ETF', '펀드', '옵션', '선물', '귀금속', '작품']; // 셀렉트 옵션으로 사용할 작업들

  // 태스크 추가
  const addTask = () => {
    const value = parseFloat(taskValue);
    if (isNaN(value)) {
      alert('Please enter a valid number for task value.');
      return;
    }

    setTasks((prevTasks) => {
      const existingTaskIndex = prevTasks.findIndex(task => task.label === taskName);
      if (existingTaskIndex !== -1) {
        const updatedTasks = [...prevTasks];
        updatedTasks[existingTaskIndex] = { label: taskName, value };
        return updatedTasks;
      }
      return [...prevTasks, { label: taskName, value }];
    });

    setTaskName('');
    setTaskValue('');
  };

  // 태스크 삭제
  const handleDeleteTask = (taskIndex: number) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(taskIndex, 1);
    setTasks(updatedTasks);
  };

  // 등록
  const register = () => {

  }

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

  return (
    <div className='flex container mx-auto p-4'>
      <div className='w-full'>
      <h1 className="text-2xl font-bold mb-4 text-center">자산 분배도</h1>
      <div className="flex justify-center items-center mb-4">
        <select
          className="mr-2 p-2 border border-gray-300 rounded"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        >
          <option value="" disabled>자산 선택</option>
          {taskOptions.map((task) => (
            <option key={task} value={task}>
              {task}
            </option>
          ))}
        </select>
        <input
          className="mr-2 p-2 border border-gray-300 rounded"
          type="text"
          placeholder="자산"
          value={taskValue}
          onChange={(e) => setTaskValue(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white p-2 rounded"
          onClick={addTask}
        >
          자산 추가
        </button>
      </div>

      {tasks.length === 0 ? <div className="mb-8 flex justify-center items-center">총자산을 등록해 주세요</div> : <div className="mb-8 flex justify-center items-center">
        <DonutChart tasks={tasks} />
      </div>}

      <div className="flex justify-center">
        <ul className="mb-8 w-1/2">
          {tasks.map((task, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <span>{task.label}: {numberToKorean(task.value)}원</span>
              <button
                className="bg-red-500 text-white p-1 rounded"
                onClick={() => handleDeleteTask(index)}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center">
        <button
          className="bg-green-500 text-white p-2 rounded mb-8"
          onClick={register}
        >
          등록
        </button>
      </div>

      <div className='flex justify-center items-center'>
        {/* LineChart 컴포넌트 사용 */}
        <LineChart />
      </div>
      </div>
      <div className='w-80 m-4 p-8 bg-yellow-500'>저장된 시간</div>
    </div>
    
  );
};

export default Home;
