import React, { useState, useEffect } from 'react';
import Tasks from "../Tasks/Tasks";
import './Tasklist.css';

const Tasklist = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  // Load tasks from local storage on component mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  // Save tasks to local storage whenever tasks change
  useEffect(() => {
    if (tasks.length === 0) return;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (taskInput.trim() !== '') {
      setTasks((prevTasks) => [...prevTasks, { name: taskInput, completed: false }]);
      setTaskInput('');
    }
  };

  const handleCheckboxChange = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const getCompletedTasks = () => tasks.filter((task) => task.completed);
  const completedCount = getCompletedTasks().length;
  const totalCount = tasks.length;
  const progress = totalCount !== 0 ? (completedCount / totalCount) * 100 : 100;

  function renameTask(index, newName) {
    setTasks((prev) => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    });
  }
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission
      handleAddTask();
    }
  };

  return (
    <>
      <form className="task-form" onSubmit={(e) => e.preventDefault()}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Add your task"
            aria-label="Add your task"
            aria-describedby="button-addon2"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
            onClick={handleAddTask}
          >
            Add
          </button>
        </div>
      </form>
      {tasks.map((task, index) => (
        <Tasks
          key={index}
          name={task.name}
          completed={task.completed}
          onCheckboxChange={() => handleCheckboxChange(index)}
          onDelete={() => handleDeleteTask(index)}
          onRename={(newName) => renameTask(index, newName)}
        />
      ))}
      <div className="progress">
        <div>
          Progress: {completedCount}/{totalCount} ({progress.toFixed(2)}%)
        </div>
      </div>
    </>
  );
};

export default Tasklist;
