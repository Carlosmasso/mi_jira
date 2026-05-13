import { useState, useCallback } from 'react';
import { INITIAL_TASKS } from '../data/constants';

export function useTasks() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const createTask = useCallback((taskData) => {
    setTasks(prev => [
      ...prev,
      { ...taskData, id: Math.max(...prev.map(t => t.id), 0) + 1, createdAt: new Date().toISOString().split('T')[0] },
    ]);
  }, []);

  const updateTask = useCallback((id, taskData) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...taskData } : t));
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  const moveTask = useCallback((id, newStatus) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
  }, []);

  return { tasks, createTask, updateTask, deleteTask, moveTask };
}
