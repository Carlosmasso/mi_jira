import { useState, useMemo } from 'react';
import { KanbanColumn } from '../components/KanbanColumn';
import { TaskDialog } from '../components/TaskDialog';
import { BoardFilters } from '../components/BoardFilters';
import { useTasks } from '../hooks/useTasks';
import { STATUSES } from '../data/constants';
import styles from './Kanban.module.css';

export default function Kanban() {
  const { tasks, createTask, updateTask, deleteTask, moveTask } = useTasks();

  const [dialog, setDialog] = useState({ open: false, task: null, defaultStatus: 'todo' });
  const [search, setSearch] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [filterType, setFilterType] = useState('');

  const filtered = useMemo(() => tasks.filter(t => {
    const matchSearch   = !search        || t.title.toLowerCase().includes(search.toLowerCase()) || t.description?.toLowerCase().includes(search.toLowerCase());
    const matchPriority = !filterPriority || t.priority === filterPriority;
    const matchType     = !filterType     || t.type === filterType;
    return matchSearch && matchPriority && matchType;
  }), [tasks, search, filterPriority, filterType]);

  const openCreate  = (statusId) => setDialog({ open: true, task: null, defaultStatus: statusId });
  const openEdit    = (task)     => setDialog({ open: true, task, defaultStatus: task.status });
  const closeDialog = ()         => setDialog(d => ({ ...d, open: false }));

  const handleSave = (data) => {
    if (data.id) updateTask(data.id, data);
    else createTask(data);
    closeDialog();
  };

  const handleDropTask = (taskId, newStatus) => {
    const task = tasks.find(t => String(t.id) === String(taskId));
    if (task && task.status !== newStatus) {
      moveTask(task.id, newStatus);
    }
  };

  const totalByStatus = (id) => tasks.filter(t => t.status === id).length;

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>Kanban Board</h1>
          <div className={styles.stats}>
            {STATUSES.map(s => (
              <span key={s.id} className={styles.stat} style={{ borderColor: s.color, color: s.color }}>
                {s.label}: <strong>{totalByStatus(s.id)}</strong>
              </span>
            ))}
          </div>
        </div>
        <button className={styles.newBtn} onClick={() => openCreate('todo')}>
          + New task
        </button>
      </header>

      <div className={styles.filterBar}>
        <BoardFilters
          search={search}
          onSearch={setSearch}
          priority={filterPriority}
          onPriority={setFilterPriority}
          type={filterType}
          onType={setFilterType}
        />
        {(search || filterPriority || filterType) && (
          <span className={styles.activeFilters}>
            {filtered.length} of {tasks.length} tasks
          </span>
        )}
      </div>

      <main className={styles.board}>
        {STATUSES.map(status => (
          <KanbanColumn
            key={status.id}
            status={status}
            tasks={filtered.filter(t => t.status === status.id)}
            onAddTask={openCreate}
            onEditTask={openEdit}
            onDeleteTask={deleteTask}
            onDropTask={handleDropTask}
          />
        ))}
      </main>

      <TaskDialog
        open={dialog.open}
        onClose={closeDialog}
        task={dialog.task}
        defaultStatus={dialog.defaultStatus}
        onSave={handleSave}
      />
    </div>
  );
}
