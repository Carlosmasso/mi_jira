import { useState, useEffect } from "react";
import { ASSIGNEES, TYPES, PRIORITIES, STATUSES } from "../data/constants";
import styles from "./TaskDialog.module.css";

const initialForm = {
  title: "",
  description: "",
  priority: "medium",
  type: "task",
  assignee: "",
  status: "todo",
};

export function TaskDialog({ open, onClose, task, onSave, defaultStatus }) {
  const isEditing = Boolean(task?.id);
  const defaultForm = { ...initialForm, status: defaultStatus || "todo" };

  const [form, setForm] = useState(defaultForm);

  useEffect(() => {
    if (task) {
      setForm({
        ...defaultForm,
        ...task,
      });
    } else {
      setForm(defaultForm);
    }
  }, [task, defaultStatus]);

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSave = () => {
    if (!form.title.trim()) return;
    onSave({ ...task, ...form, assignee: form.assignee || null });
  };

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <header className={styles.header}>
          <h3>{isEditing ? "Edit Task" : "New Task"}</h3>
          <button className={styles.closeBtn} onClick={onClose}>
            ×
          </button>
        </header>

        <div className={styles.body}>
          <div className={styles.field}>
            <label>Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Enter task title…"
              autoFocus
            />
          </div>

          <div className={styles.field}>
            <label>Description</label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Add a description…"
              rows={3}
            />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Type</label>
              <select
                value={form.type}
                onChange={(e) => set("type", e.target.value)}
              >
                {Object.entries(TYPES).map(([val, { label, icon }]) => (
                  <option key={val} value={val}>
                    {icon} {label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label>Priority</label>
              <select
                value={form.priority}
                onChange={(e) => set("priority", e.target.value)}
              >
                {Object.entries(PRIORITIES).map(([val, { label, icon }]) => (
                  <option key={val} value={val}>
                    {icon} {label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Status</label>
              <select
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
              >
                {STATUSES.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label>Assignee</label>
              <select
                value={form.assignee}
                onChange={(e) => set("assignee", e.target.value)}
              >
                <option value="">Unassigned</option>
                {ASSIGNEES.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <footer className={styles.footer}>
          <button className={styles.btnGhost} onClick={onClose}>
            Cancel
          </button>
          <button
            className={styles.btnPrimary}
            onClick={handleSave}
            disabled={!form.title.trim()}
          >
            {isEditing ? "Update task" : "Create task"}
          </button>
        </footer>
      </div>
    </div>
  );
}
