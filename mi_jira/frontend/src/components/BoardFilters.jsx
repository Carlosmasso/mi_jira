import { PRIORITIES, TYPES, ASSIGNEES } from "../data/constants";
import styles from "./BoardFilters.module.css";
import Select from "./Select";

export function BoardFilters({
  search,
  onSearch,
  priority,
  onPriority,
  type,
  onType,
}) {
  return (
    <div className={styles.bar}>
      <div className={styles.searchWrapper}>
        <span className={styles.searchIcon}>⌕</span>
        <input
          type="text"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search tasks…"
          className={styles.searchInput}
        />
        {search && (
          <button className={styles.clearBtn} onClick={() => onSearch("")}>
            ×
          </button>
        )}
      </div>

      <div className={styles.filters}>
        <Select
          value={type}
          onChange={onType}
          options={Object.entries(TYPES).map(([val, { label, icon }]) => ({
            value: val,
            label,
            icon,
          }))}
          className={styles.select}
          defaultValue="All types"
        />

        <Select
          value={priority}
          onChange={onPriority}
          options={Object.entries(PRIORITIES).map(([val, { label, icon }]) => ({
            value: val,
            label,
            icon,
          }))}
          className={styles.select}
          defaultValue="All priorities"
        />
      </div>
    </div>
  );
}
