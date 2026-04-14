# TaskFlow — Gestión de Tareas estilo Jira

Aplicación completa de gestión de tareas con tablero Kanban, vista de lista, filtros y CRUD completo.

## Estructura del proyecto

```
taskflow/
├── backend/
│   ├── server.js        ← API REST con Express
│   └── package.json
└── frontend/
    ├── src/
    │   └── App.jsx      ← Aplicación React completa
    ├── package.json
    └── index.html
```

---

## 🚀 Instalación y arranque

### 1. Backend (API con Express)

```bash
mkdir taskflow-backend && cd taskflow-backend
# Copia server.js y package.json aquí
npm install
npm run dev     # Con auto-reload
# o
npm start       # Producción
```

El servidor arranca en **http://localhost:3001**

---

### 2. Frontend (React con Vite)

```bash
npm create vite@latest taskflow-frontend -- --template react
cd taskflow-frontend
npm install
# Sustituye src/App.jsx con el archivo proporcionado
npm run dev
```

El frontend arranca en **http://localhost:5173**

---

## 🔌 API Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/tasks` | Listar tareas (con filtros opcionales) |
| GET | `/api/tasks/:id` | Obtener una tarea |
| POST | `/api/tasks` | Crear tarea |
| PUT | `/api/tasks/:id` | Actualizar tarea completa |
| PATCH | `/api/tasks/:id/status` | Cambiar solo el estado |
| DELETE | `/api/tasks/:id` | Eliminar tarea |
| GET | `/api/stats` | Estadísticas del proyecto |

### Filtros disponibles (GET /api/tasks)
- `?status=todo|in-progress|review|done`
- `?priority=low|medium|high`
- `?type=task|story|bug`
- `?search=texto`

---

## ✨ Funcionalidades

- **Tablero Kanban** con 4 columnas: Por hacer, En progreso, En revisión, Hecho
- **Vista de lista** con todas las tareas
- **Crear / Editar / Eliminar** tareas con formulario modal
- **Cambio rápido de estado** desde menú contextual en cada tarjeta
- **Filtros** por estado, prioridad, tipo y búsqueda por texto
- **Estadísticas** en tiempo real
- **Asignación** de tareas a miembros del equipo
- **Tipos** de ítem: Tarea, Historia, Bug
- **Prioridades**: Alta, Media, Baja

---

## 🗄️ Persistencia (siguiente paso)

Actualmente los datos están en memoria. Para persistencia real, puedes integrar:

```bash
# SQLite (simple, sin servidor)
npm install better-sqlite3

# PostgreSQL con Prisma ORM
npm install prisma @prisma/client
npx prisma init
```