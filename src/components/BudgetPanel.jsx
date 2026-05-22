import { useState } from 'react';
import { TIPS } from '../data/meals';
import styles from './BudgetPanel.module.css';

export default function BudgetPanel({ picks, budget, setBudget, totalSpent, showToast }) {
  const [inputVal, setInputVal] = useState(String(budget));

  const pct     = Math.min((totalSpent / budget) * 100, 100);
  const barClass = pct > 90 ? styles.over : pct > 70 ? styles.warn : '';

  const handleSet = () => {
    const n = parseInt(inputVal, 10);
    if (isNaN(n) || n <= 0) { showToast('Enter a valid budget!'); return; }
    setBudget(n);
    showToast(`Budget set to Ksh ${n.toLocaleString()} ✓`);
  };

  // breakdown by time
  const breakdown = picks.reduce((acc, p) => {
    acc[p.time] = (acc[p.time] || 0) + p.costNum;
    return acc;
  }, {});

  return (
    <div className={styles.panel}>
      <div className={styles.card}>
        <div className={styles.cardTitle}>📊 Weekly Budget Tracker</div>

        <div className={styles.spentRow}>
          <span className={styles.spentLabel}>Spent so far</span>
          <span className={styles.spentValue}>Ksh {totalSpent.toLocaleString()}</span>
        </div>

        <div className={styles.barWrap}>
          <div
            className={`${styles.bar} ${barClass}`}
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className={styles.barEnds}>
          <span>Ksh 0</span>
          <span>Ksh {budget.toLocaleString()}</span>
        </div>

        {pct > 90 && (
          <div className={styles.alert}>
            ⚠️ {pct >= 100 ? 'Over budget! Time to cook at home.' : 'Almost at your limit!'}
          </div>
        )}

        <div className={styles.inputRow}>
          <input
            type="number"
            className={styles.input}
            placeholder="My weekly budget (Ksh)"
            value={inputVal}
            min="0"
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSet()}
          />
          <button className={styles.setBtn} onClick={handleSet}>Set</button>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.cardTitle}>📈 Spending Breakdown</div>
        {Object.keys(breakdown).length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>💸</span>
            Save some picks to see your breakdown.
          </div>
        ) : (
          <div className={styles.breakdown}>
            {Object.entries(breakdown).map(([time, amt]) => (
              <div key={time} className={styles.breakdownRow}>
                <span className={styles.breakdownTime}>{time.charAt(0).toUpperCase() + time.slice(1)}</span>
                <div className={styles.breakdownBarWrap}>
                  <div
                    className={styles.breakdownBar}
                    style={{ width: `${Math.min((amt / totalSpent) * 100, 100)}%` }}
                  />
                </div>
                <span className={styles.breakdownAmt}>Ksh {amt.toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className={styles.card}>
        <div className={styles.cardTitle}>💡 Save More, Eat Better</div>
        {TIPS.slice(5).map((tip, i) => (
          <div key={i} className={styles.tip}>
            <span>{tip.icon}</span>
            <span>{tip.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
