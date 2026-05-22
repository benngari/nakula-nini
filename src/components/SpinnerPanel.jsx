import { useState, useCallback, useEffect } from 'react';
import { MEALS, TIPS } from '../data/meals';
import FilterBar from './FilterBar';
import styles from './SpinnerPanel.module.css';

export default function SpinnerPanel({ onSave, showToast, quickMeal, onQuickMealConsumed }) {
  const [filter, setFilter]       = useState('all');
  const [currentMeal, setMeal]    = useState(null);
  const [spinning, setSpinning]   = useState(false);
  const [flashMeal, setFlashMeal] = useState(null);
  const [popKey, setPopKey]       = useState(0);

  // Load a meal passed from the Menu tab
  useEffect(() => {
    if (quickMeal) {
      setMeal(quickMeal);
      setPopKey(k => k + 1);
      onQuickMealConsumed();
    }
  }, [quickMeal]);

  const filtered = filter === 'all' ? MEALS : MEALS.filter(m => m.time === filter);

  const spin = useCallback(() => {
    if (spinning || !filtered.length) return;
    setSpinning(true);
    setMeal(null);

    let count = 0;
    const interval = setInterval(() => {
      setFlashMeal(filtered[Math.floor(Math.random() * filtered.length)]);
      count++;
      if (count >= 7) {
        clearInterval(interval);
        const winner = filtered[Math.floor(Math.random() * filtered.length)];
        setFlashMeal(null);
        setMeal(winner);
        setPopKey(k => k + 1);
        setSpinning(false);
      }
    }, 90);
  }, [spinning, filtered]);

  const save = () => {
    if (!currentMeal) return;
    onSave(currentMeal);
    showToast(`Saved: ${currentMeal.name} ✓`);
  };

  const share = () => {
    if (!currentMeal) return;
    const text = `Nakula Nini? Today I'm having ${currentMeal.name} ${currentMeal.emoji} — ${currentMeal.cost} from ${currentMeal.where} 🇰🇪`;
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text).then(() => showToast('Copied to clipboard!'));
    }
  };

  const displayMeal = flashMeal || currentMeal;

  return (
    <div className={styles.panel}>
      <div className={styles.heroCard}>
        <div className={styles.resultBox}>
          {displayMeal ? (
            <div key={popKey + (flashMeal ? 'f' : 'r')} className={`${styles.mealDisplay} ${!flashMeal ? 'pop' : ''}`}>
              <span className={styles.mealEmoji}>{displayMeal.emoji}</span>
              <div className={styles.mealName}>{displayMeal.name}</div>
              {!flashMeal && <div className={styles.mealDesc}>{displayMeal.desc}</div>}
            </div>
          ) : (
            <p className={styles.placeholder}>Tap the button to discover your meal ✨</p>
          )}
        </div>

        {currentMeal && !flashMeal && (
          <>
            <div className={styles.metaGrid}>
              <MetaChip label="Est. Cost"  value={currentMeal.cost}    />
              <MetaChip label="Filling"    value={currentMeal.fill}    />
              <MetaChip label="Protein"    value={currentMeal.protein} />
            </div>
            <div className={styles.metaGrid}>
              <MetaChip label="Where to Get" value={currentMeal.where} wide />
              <MetaChip label="Meal Time"    value={currentMeal.time.charAt(0).toUpperCase() + currentMeal.time.slice(1)} />
            </div>
          </>
        )}

        <button
          className={`${styles.spinBtn} ${spinning ? 'wiggle' : ''}`}
          onClick={spin}
          disabled={spinning}
        >
          🎲 {currentMeal ? 'Spin Again' : 'Spin for a Meal'}
        </button>

        <div className={styles.actionRow}>
          <ActionBtn icon="↺" label="Respin" onClick={spin}  disabled={spinning || !currentMeal} />
          <ActionBtn icon="＋" label="Save"   onClick={save}  disabled={!currentMeal} />
          <ActionBtn icon="⬆" label="Share"  onClick={share} disabled={!currentMeal} />
        </div>
      </div>

      <p className={styles.sectionLabel}>Filter by Meal Time</p>
      <FilterBar active={filter} onChange={setFilter} />

      <div className={styles.tipsCard}>
        <div className={styles.cardTitle}>💡 Comrade Money Tips</div>
        {TIPS.slice(0, 5).map((tip, i) => (
          <div key={i} className={styles.tip}>
            <span>{tip.icon}</span>
            <span>{tip.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MetaChip({ label, value, wide }) {
  return (
    <div className={`${styles.metaChip} ${wide ? styles.wide : ''}`}>
      <span className={styles.metaLabel}>{label}</span>
      <span className={styles.metaValue}>{value}</span>
    </div>
  );
}

function ActionBtn({ icon, label, onClick, disabled }) {
  return (
    <button className={styles.actionBtn} onClick={onClick} disabled={disabled}>
      {icon} {label}
    </button>
  );
}
