import React from 'react';
import { TaskCard } from './TaskCard';
import styles from './KanbanColumn.module.css';

export function KanbanColumn({ status, tasks, onAddTask, onEditTask, onDeleteTask, onDropTask }) {
  const [isDragOver, setIsDragOver] = React.useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    // CAMBIO CRÍTICO: Leemos el ID como String para soportar formatos de Jira (ej: "1" o "TASK-101")
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) onDropTask(taskId, status.id);
  };

  return (
    <div className={styles.column}>
      <header className={styles.header} style={{ borderTopColor: status.color }}>
        <div className={styles.headerLeft}>
          <span className={styles.dot} style={{ background: status.color }} />
          <h3 className={styles.label}>{status.label}</h3>
        </div>
        <span className={styles.count}>{tasks.length}</span>
      </header>

      <div 
        className={`${styles.cards} ${isDragOver ? styles.dragOver : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {tasks.length === 0 ? (
          <div className={styles.empty}>
            <p>No tasks here</p>
            <span>Drop tasks here or create a new one</span>
          </div>
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              onDragStart={(e) => {
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('taskId', String(task.id));
              }}
            />
          ))
        )}
      </div>

      <footer className={styles.footer}>
        <button className={styles.addBtn} onClick={() => onAddTask(status.id)}>
          + Add task
        </button>
      </footer>
    </div>
  );
}
