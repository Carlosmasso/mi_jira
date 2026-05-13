import { useState, useCallback, useEffect } from 'react';
import { INITIAL_TASKS } from '../data/constants';

const CHANNEL_KEY = 'jira_tabs_sync_channel';

// Función auxiliar para emitir eventos a otras pestañas
const emitSyncEvent = (type, payload) => {
  const channel = new BroadcastChannel(CHANNEL_KEY);
  channel.postMessage({ type, payload });
  channel.close();
};

export function useTasks() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  // 📡 SISTEMA DE SINCRONIZACIÓN EN TIEMPO REAL (Múltiples Pestañas)
  useEffect(() => {
    const channel = new BroadcastChannel(CHANNEL_KEY);

    // Escuchar las acciones remotas realizadas en las otras pestañas
    channel.onmessage = (event) => {
      const { type, payload } = event.data;

      switch (type) {
        case 'REMOTE_TASK_MOVED':
        case 'REMOTE_TASK_UPDATED':
          setTasks(prev => 
            prev.map(t => String(t.id) === String(payload.id) ? { ...t, ...payload.data } : t)
          );
          break;
        case 'REMOTE_TASK_CREATED':
          setTasks(prev => [...prev, payload.data]);
          break;
        case 'REMOTE_TASK_DELETED':
          setTasks(prev => prev.filter(t => t.id !== payload.id));
          break;
        default:
          break;
      }
    };

    return () => {
      channel.close(); // Limpieza del canal al destruir el componente
    };
  }, []);

  const createTask = useCallback((taskData) => {
    const newTask = { 
      ...taskData, 
      id: Math.max(...(tasks.length > 0 ? tasks.map(t => t.id) : [0]), 0) + 1, 
      createdAt: new Date().toISOString().split('T')[0] 
    };
    setTasks(prev => [...prev, newTask]);
    emitSyncEvent('REMOTE_TASK_CREATED', { data: newTask });
  }, [tasks]);

  const updateTask = useCallback((id, taskData) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...taskData } : t));
    emitSyncEvent('REMOTE_TASK_UPDATED', { id, data: taskData });
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    emitSyncEvent('REMOTE_TASK_DELETED', { id });
  }, []);

  const moveTask = useCallback((id, newStatus) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, status: newStatus } : t));
    emitSyncEvent('REMOTE_TASK_MOVED', { id, data: { status: newStatus } });
  }, []);

  return { tasks, createTask, updateTask, deleteTask, moveTask };
}
