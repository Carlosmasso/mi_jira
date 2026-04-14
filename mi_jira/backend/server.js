const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// In-memory database
let tasks = [
  {
    id: uuidv4(),
    title: 'Configurar entorno de desarrollo',
    description: 'Instalar Node.js, React y dependencias necesarias para el proyecto.',
    status: 'done',
    priority: 'high',
    type: 'task',
    assignee: 'Ana García',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Diseñar arquitectura de la base de datos',
    description: 'Definir esquemas, relaciones y modelo de datos para la aplicación.',
    status: 'in-progress',
    priority: 'high',
    type: 'story',
    assignee: 'Carlos López',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Implementar autenticación de usuarios',
    description: 'Sistema de login, registro y gestión de sesiones con JWT.',
    status: 'in-progress',
    priority: 'medium',
    type: 'story',
    assignee: 'María Torres',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Crear componentes UI del dashboard',
    description: 'Diseñar y desarrollar los componentes principales del panel de control.',
    status: 'todo',
    priority: 'medium',
    type: 'task',
    assignee: 'Pedro Ruiz',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Corregir bug en el formulario de login',
    description: 'El formulario no valida correctamente el formato del email.',
    status: 'todo',
    priority: 'high',
    type: 'bug',
    assignee: 'Ana García',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: 'Escribir tests unitarios',
    description: 'Cobertura mínima del 80% para todos los servicios principales.',
    status: 'todo',
    priority: 'low',
    type: 'task',
    assignee: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// GET all tasks
app.get('/api/tasks', (req, res) => {
  const { status, priority, type, search } = req.query;
  let filtered = [...tasks];

  if (status) filtered = filtered.filter(t => t.status === status);
  if (priority) filtered = filtered.filter(t => t.priority === priority);
  if (type) filtered = filtered.filter(t => t.type === type);
  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(t =>
      t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
    );
  }

  res.json(filtered);
});

// GET single task
app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
  res.json(task);
});

// POST create task
app.post('/api/tasks', (req, res) => {
  const { title, description, status, priority, type, assignee } = req.body;

  if (!title || title.trim() === '') {
    return res.status(400).json({ error: 'El título es obligatorio' });
  }

  const newTask = {
    id: uuidv4(),
    title: title.trim(),
    description: description?.trim() || '',
    status: status || 'todo',
    priority: priority || 'medium',
    type: type || 'task',
    assignee: assignee || null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  tasks.unshift(newTask);
  res.status(201).json(newTask);
});

// PUT update task
app.put('/api/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Tarea no encontrada' });

  const { title, description, status, priority, type, assignee } = req.body;

  if (title !== undefined && title.trim() === '') {
    return res.status(400).json({ error: 'El título no puede estar vacío' });
  }

  tasks[index] = {
    ...tasks[index],
    ...(title !== undefined && { title: title.trim() }),
    ...(description !== undefined && { description: description.trim() }),
    ...(status !== undefined && { status }),
    ...(priority !== undefined && { priority }),
    ...(type !== undefined && { type }),
    ...(assignee !== undefined && { assignee }),
    updatedAt: new Date().toISOString(),
  };

  res.json(tasks[index]);
});

// PATCH update task status
app.patch('/api/tasks/:id/status', (req, res) => {
  const index = tasks.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Tarea no encontrada' });

  const { status } = req.body;
  const validStatuses = ['todo', 'in-progress', 'review', 'done'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Estado no válido' });
  }

  tasks[index].status = status;
  tasks[index].updatedAt = new Date().toISOString();
  res.json(tasks[index]);
});

// DELETE task
app.delete('/api/tasks/:id', (req, res) => {
  const index = tasks.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Tarea no encontrada' });

  tasks.splice(index, 1);
  res.status(204).send();
});

// GET stats
app.get('/api/stats', (req, res) => {
  const stats = {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    review: tasks.filter(t => t.status === 'review').length,
    done: tasks.filter(t => t.status === 'done').length,
    highPriority: tasks.filter(t => t.priority === 'high').length,
  };
  res.json(stats);
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
