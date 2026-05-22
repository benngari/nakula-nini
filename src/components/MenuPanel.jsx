import { useState } from 'react';
import { MEALS } from '../data/meals';
import FilterBar from './FilterBar';
import styles from './MenuPanel.module.css';

const TIME_COLORS = {
  breakfast: { bg: '#fff3cd', text: '#7a5500' },
  lunch:     { bg: '#d4edda', text: '#1a5c30' },
  supper:    { bg: '#d0e8ff', text: '#1a3d6e' },
  snack:     { bg: '#fde0f0', text: '#7a1a4b' },
};

export default function MenuPanel({ onQuickSelect, showToast }) {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? MEALS : MEALS.filter(m => m.time === filter);

  const handleSelect = (meal) => {
    onQuickSelect(meal);
    showToast(`${meal.emoji} ${meal.name} selected — see Spin tab!`);
  };

  return (
    <div className={styles.panel}>
      <FilterBar active={filter} onChange={setFilter} />

      <div className={styles.grid}>
        {filtered.map(meal => {
          const tc = TIME_COLORS[meal.time];
          return (
            <div key={meal.id} className={styles.item} onClick={() => handleSelect(meal)}>
              <span className={styles.emoji}>{meal.emoji}</span>
              <div className={styles.info}>
                <div className={styles.name}>{meal.name}</div>
                <div className={styles.detail}>{meal.cost} · {meal.where}</div>
                <div className={styles.tags}>
                  <span
                    className={styles.tag}
                    style={{ background: tc.bg, color: tc.text }}
                  >
                    {meal.time}
                  </span>
                  <span className={styles.tagNeutral}>{meal.protein} protein</span>
                  <span className={styles.tagNeutral}>{meal.fill} fill</span>
                </div>
              </div>
              <span className={styles.arrow}>→</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
