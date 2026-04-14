import { useState } from 'react';

const COLUMNS = [
  { key: 'backlog',    label: '📦 BACKLOG',     accent: 'var(--col-backlog)',   glow: '112,112,168' },
  { key: 'todo',       label: '📋 TO-DO',        accent: 'var(--col-todo)',      glow: '255,230,0'   },
  { key: 'progress',   label: '⚙ IN PROGRESS',  accent: 'var(--col-progress)',  glow: '0,229,255'   },
  { key: 'complete',   label: '✔ COMPLETE',      accent: 'var(--col-complete)',  glow: '57,255,20'   },
  { key: 'blocked',    label: '⛔ BLOCKED',       accent: 'var(--col-blocked)',   glow: '255,45,85'   },
];

const INITIAL_TASKS = [
  { id: 1,  col: 'backlog',  title: 'Definir roadmap Q3',         type: 'story', priority: 'low',    assignee: 'Ana G.' },
  { id: 2,  col: 'backlog',  title: 'Investigar librerías drag',  type: 'task',  priority: 'low',    assignee: null },
  { id: 3,  col: 'backlog',  title: 'Crear wireframes móvil',     type: 'story', priority: 'medium', assignee: 'Pedro R.' },
  { id: 4,  col: 'todo',     title: 'Configurar CI/CD pipeline',  type: 'task',  priority: 'high',   assignee: 'Carlos L.' },
  { id: 5,  col: 'todo',     title: 'Diseñar componente Card',    type: 'task',  priority: 'medium', assignee: 'Laura S.' },
  { id: 6,  col: 'todo',     title: 'Escribir tests unitarios',   type: 'task',  priority: 'medium', assignee: null },
  { id: 7,  col: 'progress', title: 'Implementar auth JWT',       type: 'task',  priority: 'high',   assignee: 'Ana G.' },
  { id: 8,  col: 'progress', title: 'Tablero Kanban UI',          type: 'story', priority: 'high',   assignee: 'Carlos L.' },
  { id: 9,  col: 'progress', title: 'Fix bug #42 login loop',     type: 'bug',   priority: 'high',   assignee: 'Pedro R.' },
  { id: 10, col: 'complete', title: 'Setup proyecto React',       type: 'task',  priority: 'low',    assignee: 'Laura S.' },
  { id: 11, col: 'complete', title: 'Diseño sistema de colores',  type: 'story', priority: 'medium', assignee: 'Ana G.' },
  { id: 12, col: 'blocked',  title: 'Integrar API de pagos',      type: 'task',  priority: 'high',   assignee: 'Carlos L.' },
  { id: 13, col: 'blocked',  title: 'Deploy en producción',       type: 'task',  priority: 'high',   assignee: null },
];

const PRIORITY_MAP = {
  high:   { label: 'HIGH',   color: 'var(--red)',    bg: 'rgba(255,45,85,0.15)'   },
  medium: { label: 'MED',    color: 'var(--yellow)', bg: 'rgba(255,230,0,0.12)'   },
  low:    { label: 'LOW',    color: 'var(--text-dim)', bg: 'rgba(112,112,168,0.15)' },
};

const TYPE_MAP = {
  task:  { icon: '▣', color: 'var(--cyan)'   },
  story: { icon: '◈', color: 'var(--purple)' },
  bug:   { icon: '⚠', color: 'var(--orange)' },
};

function Avatar({ name }) {
  if (!name) return <span style={{ fontSize: 13, color: 'var(--text-dim)' }}>—</span>;
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const hue = name.charCodeAt(0) * 37 % 360;
  return (
    <span title={name} style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      width: 24, height: 24, fontSize: 9,
      fontFamily: 'var(--pixel)',
      background: `hsl(${hue},70%,25%)`,
      color: `hsl(${hue},80%,70%)`,
      border: `1px solid hsl(${hue},70%,50%)`,
      flexShrink: 0,
    }}>{initials}</span>
  );
}

function TaskCard({ task }) {
  const priority = PRIORITY_MAP[task.priority] || PRIORITY_MAP.low;
  const type     = TYPE_MAP[task.type]     || TYPE_MAP.task;
  return (
    <div className="task-card" style={{
      background: 'var(--bg-card)',
      border: '2px solid var(--border)',
      padding: '10px 12px',
      display: 'flex', flexDirection: 'column', gap: 8,
      cursor: 'pointer',
      transition: 'border-color 0.15s, box-shadow 0.15s',
      animation: 'fadeIn 0.3s ease',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--border-glow)';
        e.currentTarget.style.boxShadow   = '0 0 10px rgba(80,80,192,0.4)';
        e.currentTarget.style.background  = 'var(--bg-hover)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.boxShadow   = 'none';
        e.currentTarget.style.background  = 'var(--bg-card)';
      }}
    >
      {/* Title */}
      <span style={{ fontFamily: 'var(--vt)', fontSize: 16, color: 'var(--text-bright)', lineHeight: 1.3 }}>
        {task.title}
      </span>

      {/* Badges row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
        {/* Type */}
        <span style={{
          fontFamily: 'var(--pixel)', fontSize: 7,
          color: type.color, background: 'rgba(0,0,0,0.35)',
          border: `1px solid ${type.color}`,
          padding: '2px 5px',
        }}>
          {type.icon} {task.type.toUpperCase()}
        </span>

        {/* Priority */}
        <span style={{
          fontFamily: 'var(--pixel)', fontSize: 7,
          color: priority.color, background: priority.bg,
          border: `1px solid ${priority.color}`,
          padding: '2px 5px',
        }}>
          {priority.label}
        </span>

        {/* Spacer + Avatar */}
        <span style={{ marginLeft: 'auto' }}>
          <Avatar name={task.assignee} />
        </span>
      </div>
    </div>
  );
}

function Column({ col, tasks }) {
  const count = tasks.length;
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 0,
      minWidth: 220, flex: '1 1 220px', maxWidth: 280,
    }}>
      {/* Column header */}
      <div style={{
        fontFamily: 'var(--pixel)',
        fontSize: 9,
        color: col.accent,
        background: 'var(--bg-panel)',
        border: `2px solid ${col.accent}`,
        borderBottom: 'none',
        padding: '10px 14px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        textShadow: `0 0 8px rgba(${col.glow},0.8)`,
        boxShadow: `0 0 14px rgba(${col.glow},0.25)`,
        letterSpacing: '0.05em',
      }}>
        <span>{col.label}</span>
        <span style={{
          background: `rgba(${col.glow},0.2)`,
          border: `1px solid rgba(${col.glow},0.6)`,
          color: col.accent,
          fontFamily: 'var(--pixel)',
          fontSize: 8,
          padding: '2px 7px',
          minWidth: 22, textAlign: 'center',
        }}>{count}</span>
      </div>

      {/* Cards container */}
      <div style={{
        background: 'var(--bg-panel)',
        border: `2px solid ${col.accent}`,
        borderTop: `1px solid rgba(${col.glow},0.3)`,
        boxShadow: `0 0 14px rgba(${col.glow},0.15)`,
        padding: 10,
        display: 'flex', flexDirection: 'column', gap: 8,
        minHeight: 180,
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 220px)',
      }}>
        {count === 0 && (
          <div style={{
            textAlign: 'center', color: 'var(--text-dim)',
            fontFamily: 'var(--pixel)', fontSize: 8,
            padding: '24px 0', opacity: 0.5,
            borderTop: `1px dashed rgba(${col.glow},0.2)`,
            borderBottom: `1px dashed rgba(${col.glow},0.2)`,
          }}>
            [ EMPTY ]<br /><br />_
          </div>
        )}
        {tasks.map(t => <TaskCard key={t.id} task={t} />)}
      </div>
    </div>
  );
}

export default function Kanban() {
  const [tasks] = useState(INITIAL_TASKS);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      fontFamily: 'var(--vt)',
      display: 'flex', flexDirection: 'column',
    }}>

      {/* ── Header ───────────────────────────── */}
      <header style={{
        background: 'var(--bg-panel)',
        borderBottom: '3px solid var(--border-glow)',
        boxShadow: '0 0 24px rgba(80,80,192,0.4)',
        padding: '0 28px',
      }}>
        <div style={{
          maxWidth: 1600, margin: '0 auto',
          height: 62,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 36, height: 36,
              background: 'var(--bg)',
              border: '3px solid var(--cyan)',
              boxShadow: '0 0 12px var(--cyan)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--pixel)', fontSize: 14, color: 'var(--cyan)',
              imageRendering: 'pixelated',
            }}>T</div>
            <div>
              <div style={{
                fontFamily: 'var(--pixel)', fontSize: 13, color: 'var(--cyan)',
                textShadow: '0 0 8px var(--cyan), 0 0 20px var(--cyan)',
                animation: 'glitch 6s infinite',
              }}>TASKFLOW</div>
              <div style={{ fontFamily: 'var(--vt)', fontSize: 14, color: 'var(--text-dim)', marginTop: 2 }}>
                &gt; Mi Proyecto / Kanban Board_
              </div>
            </div>
          </div>

          {/* New task button */}
          <button className="btn btn-success" style={{ fontSize: 9 }}>
            + NEW TASK
          </button>
        </div>
      </header>

      {/* ── Stats bar ────────────────────────── */}
      <div style={{
        background: 'var(--bg-panel)',
        borderBottom: '2px solid var(--border)',
        padding: '10px 28px',
      }}>
        <div style={{
          maxWidth: 1600, margin: '0 auto',
          display: 'flex', gap: 24, flexWrap: 'wrap',
        }}>
          {COLUMNS.map(col => {
            const count = tasks.filter(t => t.col === col.key).length;
            return (
              <div key={col.key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  fontFamily: 'var(--pixel)', fontSize: 7,
                  color: col.accent,
                }}>{col.label}</span>
                <span style={{
                  fontFamily: 'var(--pixel)', fontSize: 10,
                  color: col.accent,
                  textShadow: `0 0 8px rgba(${col.glow},0.8)`,
                }}>{count}</span>
              </div>
            );
          })}
          <div style={{ marginLeft: 'auto', fontFamily: 'var(--pixel)', fontSize: 7, color: 'var(--text-dim)', alignSelf: 'center' }}>
            TOTAL: {tasks.length} TASKS
          </div>
        </div>
      </div>

      {/* ── Board ────────────────────────────── */}
      <main style={{
        flex: 1,
        maxWidth: 1600, width: '100%', margin: '0 auto',
        padding: '24px 28px',
        overflowX: 'auto',
      }}>
        <div style={{
          display: 'flex',
          gap: 16,
          alignItems: 'flex-start',
          minWidth: 'fit-content',
        }}>
          {COLUMNS.map(col => (
            <Column
              key={col.key}
              col={col}
              tasks={tasks.filter(t => t.col === col.key)}
            />
          ))}
        </div>
      </main>

      {/* ── Footer ───────────────────────────── */}
      <footer style={{
        borderTop: '2px solid var(--border)',
        padding: '12px 28px',
        textAlign: 'center',
        fontFamily: 'var(--pixel)', fontSize: 7,
        color: 'var(--text-dim)',
      }}>
        TASKFLOW v0.1.0 &nbsp;|&nbsp; PRESS F5 TO REFRESH &nbsp;|&nbsp; ©2026
        <span style={{ animation: 'blink 1s step-end infinite', marginLeft: 4 }}>█</span>
      </footer>
    </div>
  );
}
