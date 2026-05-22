import { useState, useEffect } from 'react';

const STORAGE_KEY = 'nakula-nini_picks';
const BUDGET_KEY  = 'nakula-nini_budget';

export function usePicks() {
  const [picks, setPicks] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
    catch { return []; }
  });

  const [budget, setBudgetState] = useState(() => {
    return parseInt(localStorage.getItem(BUDGET_KEY) || '2500', 10);
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(picks));
  }, [picks]);

  useEffect(() => {
    localStorage.setItem(BUDGET_KEY, String(budget));
  }, [budget]);

  const addPick = (meal) => {
    setPicks(prev => [...prev, { ...meal, savedAt: new Date().toISOString() }]);
  };

  const deletePick = (index) => {
    setPicks(prev => prev.filter((_, i) => i !== index));
  };

  const clearPicks = () => setPicks([]);

  const setBudget = (val) => {
    const n = parseInt(val, 10);
    if (!isNaN(n) && n > 0) setBudgetState(n);
  };

  const totalSpent = picks.reduce((s, p) => s + p.costNum, 0);

  return { picks, addPick, deletePick, clearPicks, budget, setBudget, totalSpent };
}
