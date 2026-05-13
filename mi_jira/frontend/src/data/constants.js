const SEMANTIC_COLORS = {
  neutral: '#6b7280',
  error: '#ef4444',
  warning: '#f59e0b',
  success: '#10b981',
  info: '#3b82f6',
};

const TYPE_COLORS = {
  task: SEMANTIC_COLORS.info,
  story: '#8b5cf6',
  bug: SEMANTIC_COLORS.error,
  epic: SEMANTIC_COLORS.warning,
};

export const STATUSES = [
  { id: 'backlog',     label: 'Backlog',      color: SEMANTIC_COLORS.neutral },
  { id: 'todo',        label: 'To Do',        color: SEMANTIC_COLORS.info },
  { id: 'in-progress', label: 'In Progress',  color: SEMANTIC_COLORS.warning },
  { id: 'done',        label: 'Done',         color: SEMANTIC_COLORS.success },
  { id: 'blocked',     label: 'Blocked',      color: SEMANTIC_COLORS.error },
];

export const PRIORITIES = {
  low:    { label: 'Low',    icon: '↓', color: SEMANTIC_COLORS.neutral },
  medium: { label: 'Medium', icon: '→', color: SEMANTIC_COLORS.warning },
  high:   { label: 'High',   icon: '↑', color: SEMANTIC_COLORS.error },
};

export const TYPES = {
  task:    { label: 'Task',    icon: '✓', color: TYPE_COLORS.task },
  story:   { label: 'Story',   icon: '★', color: TYPE_COLORS.story },
  bug:     { label: 'Bug',     icon: '✗', color: TYPE_COLORS.bug },
  epic:    { label: 'Epic',    icon: '⚡', color: TYPE_COLORS.epic },
};

export const ASSIGNEES = [
  { id: 'ana',    name: 'Ana',    initials: 'AN', color: TYPE_COLORS.story },
  { id: 'carlos', name: 'Carlos', initials: 'CA', color: TYPE_COLORS.task },
  { id: 'laura',  name: 'Laura',  initials: 'LA', color: TYPE_COLORS.task },
  { id: 'pedro',  name: 'Pedro',  initials: 'PE', color: TYPE_COLORS.story },
  { id: 'maria',  name: 'Maria',  initials: 'MA', color: TYPE_COLORS.bug },
];

export const INITIAL_TASKS = [
  { id: 1, title: 'Setup project structure',   description: 'Initialize React app with Vite and configure folder structure',     status: 'done',        priority: 'low',    assignee: 'ana',    type: 'task',  createdAt: '2026-05-01' },
  { id: 2, title: 'Design system setup',       description: 'Define color palette, typography and reusable component patterns',  status: 'done',        priority: 'medium', assignee: 'carlos', type: 'story', createdAt: '2026-05-02' },
  { id: 3, title: 'Implement Kanban board',    description: 'Build the task management UI with drag-and-drop support',           status: 'in-progress', priority: 'high',   assignee: 'laura',  type: 'task',  createdAt: '2026-05-03' },
  { id: 4, title: 'Setup API endpoints',       description: 'Create RESTful backend routes for task CRUD operations',            status: 'in-progress', priority: 'high',   assignee: 'pedro',  type: 'story', createdAt: '2026-05-04' },
  { id: 5, title: 'Write tests',               description: 'Unit and integration tests for all core components and API',        status: 'todo',        priority: 'medium', assignee: 'ana',    type: 'task',  createdAt: '2026-05-05' },
  { id: 6, title: 'Database migration',        description: 'Setup PostgreSQL schema and run initial data migrations',           status: 'todo',        priority: 'high',   assignee: null,     type: 'task',  createdAt: '2026-05-06' },
  { id: 7, title: 'Deploy to staging',         description: 'Push current build to staging environment and run smoke tests',     status: 'backlog',     priority: 'medium', assignee: 'carlos', type: 'story', createdAt: '2026-05-07' },
  { id: 8, title: 'Fix login bug',             description: 'Authentication flow breaks when user session expires mid-request',  status: 'blocked',     priority: 'high',   assignee: 'laura',  type: 'bug',   createdAt: '2026-05-08' },
  { id: 9, title: 'Mobile responsive layout',  description: 'Adapt all views to work properly on small screens',                status: 'backlog',     priority: 'medium', assignee: null,     type: 'epic',  createdAt: '2026-05-09' },
  { id: 10, title: 'Performance audit',        description: 'Profile render times and optimize slow components',                 status: 'todo',        priority: 'low',    assignee: 'pedro',  type: 'task',  createdAt: '2026-05-10' },
];
