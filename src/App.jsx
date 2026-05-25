import { useState } from 'react';
import Header       from './components/Header';
import NavTabs      from './components/NavTabs';
import SpinnerPanel from './components/SpinnerPanel';
import PicksPanel   from './components/PicksPanel';
import MenuPanel    from './components/MenuPanel';
import BudgetPanel  from './components/BudgetPanel';
import Toast        from './components/Toast';
import { usePicks } from './hooks/usePicks';
import { useToast } from './hooks/useToast';
import styles from './App.module.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('spinner');
  const [quickMeal, setQuickMeal] = useState(null);
  const { picks, addPick, deletePick, clearPicks, budget, setBudget, totalSpent } = usePicks();
  const { toast, showToast } = useToast();

  const handleQuickSelect = (meal) => {
    setQuickMeal(meal);
    setActiveTab('spinner');
    showToast(`${meal.emoji} ${meal.name} loaded — tap Respin!`);
  };

  return (
    <div className={styles.app}>
      <Header />
      <NavTabs active={activeTab} onChange={setActiveTab} />

      <main className={styles.main}>
        {activeTab === 'spinner' && (
          <SpinnerPanel
            onSave={addPick}
            showToast={showToast}
            quickMeal={quickMeal}
            onQuickMealConsumed={() => setQuickMeal(null)}
          />
        )}
        {activeTab === 'picks' && (
          <PicksPanel
            picks={picks}
            onDelete={deletePick}
            onClear={clearPicks}
            showToast={showToast}
          />
        )}
        {activeTab === 'menu' && (
          <MenuPanel
            onQuickSelect={handleQuickSelect}
            showToast={showToast}
          />
        )}
        {activeTab === 'budget' && (
          <BudgetPanel
            picks={picks}
            budget={budget}
            setBudget={setBudget}
            totalSpent={totalSpent}
            showToast={showToast}
          />
        )}
      </main>

      <footer className={styles.footer}>
        USILALE NJAA BOIS!
      </footer>

      <Toast msg={toast.msg} visible={toast.visible} />
    </div>
  );
}
