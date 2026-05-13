import { ASSIGNEES, TYPES, PRIORITIES } from '../data/constants';
import styles from './TaskCard.module.css';

function Avatar({ assigneeId }) {
  const assignee = ASSIGNEES.find(a => a.id === assigneeId);
  if (!assignee) return null;
  return (
    <span
      className={styles.avatar}
      style={{ background: assignee.color }}
      title={assignee.name}
    >
      {assignee.initials}
    </span>
  );
}

function TypeBadge({ type }) {
  const t = TYPES[type] || TYPES.task;
  return (
    <span className={styles.badge} style={{ background: t.color + '22', color: t.color, borderColor: t.color + '44' }}>
      {t.icon} {t.label}
    </span>
  );
}

function PriorityBadge({ priority }) {
  const p = PRIORITIES[priority] || PRIORITIES.medium;
  return (
    <span className={styles.badge} style={{ background: p.color + '22', color: p.color, borderColor: p.color + '44' }}>
      {p.icon} {p.label}
    </span>
  );
}

export function TaskCard({ task, onEdit, onDelete, onDragStart }) {
  return (
    <article 
      className={styles.card} 
      onClick={() => onEdit(task)}
      draggable
      onDragStart={onDragStart}
    >
      <header className={styles.cardHeader}>
        <span className={styles.taskId}>#{task.id}</span>
        <button
          className={styles.deleteBtn}
          onClick={e => { e.stopPropagation(); onDelete(task.id); }}
          title="Delete task"
        >
          ×
        </button>
      </header>

      <h4 className={styles.title}>{task.title}</h4>

      {task.description && (
        <p className={styles.description}>{task.description}</p>
      )}

      <footer className={styles.cardFooter}>
        <div className={styles.badges}>
          <TypeBadge type={task.type} />
          <PriorityBadge priority={task.priority} />
        </div>
        {task.assignee && <Avatar assigneeId={task.assignee} />}
      </footer>
    </article>
  );
}
