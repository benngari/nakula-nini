import { useState } from 'react';
import FilterBar from './FilterBar';
import styles from './PicksPanel.module.css';

export default function PicksPanel({ picks, onDelete, onClear, showToast }) {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? picks : picks.filter(p => p.time === filter);
  const totalSpent = picks.reduce((s, p) => s + p.costNum, 0);

  return (
    <div className={styles.panel}>
      <div className={styles.card}>
        <div className={styles.cardHead}>
          <span className={styles.cardTitle}>Today's Picks</span>
          {picks.length > 0 && (
            <button className={styles.clearBtn} onClick={() => { onClear(); showToast('All picks cleared'); }}>
              Clear All
            </button>
          )}
        </div>

        <FilterBar active={filter} onChange={setFilter} />

        {filtered.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>{picks.length === 0 ? '🍽️' : '🔍'}</span>
            {picks.length === 0 ? 'No picks yet. Head to Spin!' : 'No picks for this filter.'}
          </div>
        ) : (
          <div className={styles.list}>
            {filtered.map((p, i) => (
              <div key={i} className={`${styles.pickItem} fade-up`}>
                <span className={styles.pickEmoji}>{p.emoji}</span>
                <div className={styles.pickInfo}>
                  <div className={styles.pickName}>{p.name}</div>
                  <div className={styles.pickMeta}>{p.where} · {p.time.charAt(0).toUpperCase() + p.time.slice(1)}</div>
                </div>
                <span className={styles.pickCost}>{p.cost}</span>
                <button
                  className={styles.delBtn}
                  onClick={() => { onDelete(picks.indexOf(p)); showToast('Pick removed'); }}
                  aria-label="Remove pick"
                >✕</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {picks.length > 0 && (
        <div className={styles.summaryGrid}>
          <div className={styles.summaryCard}>
            <div className={styles.summaryLabel}>Meals Picked</div>
            <div className={styles.summaryValue}>{picks.length}</div>
          </div>
          <div className={styles.summaryCard}>
            <div className={styles.summaryLabel}>Est. Spend</div>
            <div className={styles.summaryValue}>Ksh {totalSpent.toLocaleString()}</div>
          </div>
        </div>
      )}
    </div>
  );
}
