import React, { useState } from 'react';
import DonutChart from '../Template/DonutChart';
import DragAndDrop from '../../components/DragAndDrop';
import LineChart from '../Template/LineChart';


const Home: React.FC = () => {
  const [tasks, setTasks] = useState<{ label: string; value: number }[]>([]);
  const [taskName, setTaskName] = useState('');
  const [taskValue, setTaskValue] = useState<string>('');
  const taskOptions = ['Task 1', 'Task 2', 'Task 3']; // 셀렉트 옵션으로 사용할 작업들
  

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

  const handleDeleteTask = (taskIndex: number) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(taskIndex, 1);
    setTasks(updatedTasks);
    
  };

  return (
    <>
      <div>
        <h1>Task Scheduler</h1>
        <div>
          <select
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          >
            <option value="" disabled>Select Task</option>
            {taskOptions.map((task) => (
              <option key={task} value={task}>
                {task}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Task Value"
            value={taskValue}
            onChange={(e) => setTaskValue(e.target.value)}
          />
          <button onClick={addTask}>Add Task</button>
        </div>

        <DonutChart tasks={tasks} />

        <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task.label}: {task.value}원
            <button onClick={() => handleDeleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>

        <DragAndDrop></DragAndDrop>
        <div>
        {/* LineChart 컴포넌트 사용 */}
        <LineChart />
      </div>

      </div>
    </>
  );
};

export default Home;
