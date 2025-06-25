import React from 'react';
import { useEffect, useState } from 'react';
import api from '../services/api';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');

  const statusFlow = {
    TO_DO: 'IN_PROGRESS',
    IN_PROGRESS: 'DONE',
    DONE: null,
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      setError('Failed to load tasks');
    }
  };

  const createTask = async () => {
    if (!title.trim()) return;
    try {
      await api.post('/tasks', { title });
      setTitle('');
      fetchTasks();
    } catch (err) {
      setError('Task creation failed');
    }
  };

  const updateStatus = async (taskId, newStatus) => {
    try {
      await api.put(`/tasks/${taskId}`, { status: newStatus });
      fetchTasks();
    } catch (err) {
      setError('Failed to update task');
    }
  };

  const startEdit = (task) => {
    setEditingTask(task);
    setEditingTitle(task.title);
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditingTitle('');
  };

  const saveEdit = async (taskId) => {
    try {
      await api.put(`/tasks/${taskId}`, { title: editingTitle });
      cancelEdit();
      fetchTasks();
    } catch (err) {
      setError('Failed to update task title');
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      fetchTasks();
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const groupTasks = (status) => tasks.filter((task) => task.status === status);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Task Dashboard</h1>

      <div className="flex mb-6 gap-2">
        <input
          type="text"
          placeholder="New Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded w-full"
        />
        <button onClick={createTask} className="bg-blue-600 text-white px-4 rounded">
          Add
        </button>
      </div>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="grid md:grid-cols-3 gap-4">
        {['TO_DO', 'IN_PROGRESS', 'DONE'].map((status) => (
          <div key={status} className="border rounded p-4 shadow">
            <h2 className="text-xl font-semibold mb-2">{status.replace('_', ' ')}</h2>

            {groupTasks(status).map((task) => (
              <div key={task.id} className="border-b py-2 flex justify-between items-center">
                {editingTask?.id === task.id ? (
                  <>
                    <input
                      value={editingTitle}
                      onChange={(e) => setEditingTitle(e.target.value)}
                      className="p-1 border rounded w-full mr-2"
                    />
                    <button
                      onClick={() => saveEdit(task.id)}
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="bg-gray-400 text-white px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <span>{task.title}</span>
                    <div className="flex gap-2">
                      {statusFlow[status] && (
                        <button
                          onClick={() => updateStatus(task.id, statusFlow[status])}
                          className="text-sm bg-green-500 text-white px-2 py-1 rounded"
                        >
                          {statusFlow[status].replace('_', ' ')}
                        </button>
                      )}
                      <button
                        onClick={() => startEdit(task)}
                        className="text-sm bg-yellow-500 text-white px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-sm bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
