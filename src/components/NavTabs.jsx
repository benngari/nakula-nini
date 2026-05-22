import styles from './NavTabs.module.css';

const TABS = [
  { id: 'spinner', label: '🍽 Spin'      },
  { id: 'picks',   label: '💾 My Picks'  },
  { id: 'menu',    label: '📋 Full Menu' },
  { id: 'budget',  label: '💰 Budget'    },
];

export default function NavTabs({ active, onChange }) {
  return (
    <nav className={styles.nav}>
      {TABS.map(tab => (
        <button
          key={tab.id}
          className={`${styles.tab} ${active === tab.id ? styles.active : ''}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}
