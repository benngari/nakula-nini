import styles from './FilterBar.module.css';
import { TIME_FILTERS } from '../data/meals';

export default function FilterBar({ active, onChange }) {
  return (
    <div className={styles.bar}>
      {TIME_FILTERS.map(f => (
        <button
          key={f}
          className={`${styles.chip} ${active === f ? styles.active : ''}`}
          onClick={() => onChange(f)}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}
