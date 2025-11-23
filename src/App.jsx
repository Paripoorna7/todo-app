import { useState } from 'react';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');

  // Add new task
  const addTask = () => {
    if (inputValue.trim() === '') {
      alert('Please enter a task!');
      return;
    }
    
    const newTask = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };
    
    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  // Toggle task completion
  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  // Calculate stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.completed).length;
  const remainingTasks = totalTasks - completedTasks;

  return (
    <div className="app">
      {/* Header */}
      <div className="header">
        <h1>📝 Todo App</h1>
        <p>Organize your tasks efficiently</p>
      </div>

      {/* Input Section */}
      <div className="input-section">
        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a new task..."
          />
          <button onClick={addTask}>Add Task</button>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({totalTasks})
        </button>
        <button
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active ({remainingTasks})
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed ({completedTasks})
        </button>
      </div>

      {/* Tasks List */}
      <div className="tasks-list">
        {filteredTasks.length === 0 ? (
          <div className="empty-state">
            {filter === 'all' && 'No tasks yet. Add one above! 🚀'}
            {filter === 'active' && 'No active tasks! 🎉'}
            {filter === 'completed' && 'No completed tasks yet. 💪'}
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className="task-item">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                {task.text}
              </span>
              <button 
                className="delete-btn"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>

      {/* Statistics */}
      {totalTasks > 0 && (
        <div className="stats">
          <h3>Statistics</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">{totalTasks}</div>
              <div className="stat-label">Total Tasks</div>
            </div>
            <div className="stat-item">
              <div className="stat-number completed">{completedTasks}</div>
              <div className="stat-label">Completed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number remaining">{remainingTasks}</div>
              <div className="stat-label">Remaining</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;