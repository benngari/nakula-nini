import { useState } from "react";
import FilterBar from "./FilterBar";
import { useToast } from "../context/ToastContext";

export default function MyPicksPanel({ picks, onDelete, onClear }) {
  const [filter, setFilter] = useState("all");
  const showToast = useToast();

  const filtered = filter === "all" ? picks : picks.filter((p) => p.time === filter);
  const total = picks.reduce((s, p) => s + p.costNum, 0);

  const handleClear = () => {
    onClear();
    showToast("All picks cleared");
  };

  return (
    <div className="panel">
      <div className="card">
        <div className="card-header-row">
          <div className="card-title" style={{ marginBottom: 0 }}>Today's Picks</div>
          {picks.length > 0 && (
            <button className="danger-link" onClick={handleClear}>Clear All</button>
          )}
        </div>
        <FilterBar active={filter} onChange={setFilter} />

        <div className="picks-list">
          {filtered.length === 0 ? (
            <div className="empty">
              <span className="empty-icon">🍽️</span>
              {picks.length === 0 ? "No picks yet. Head to Spin!" : "No picks for this time."}
            </div>
          ) : (
            filtered.map((p, i) => (
              <div className="pick-item" key={p.savedAt + i}>
                <span className="pick-emoji">{p.emoji}</span>
                <div className="pick-info">
                  <div className="pick-name">{p.name}</div>
                  <div className="pick-meta">{p.where} · {p.time.charAt(0).toUpperCase() + p.time.slice(1)}</div>
                </div>
                <span className="pick-cost">{p.cost}</span>
                <button className="pick-del" onClick={() => onDelete(picks.indexOf(p))}>✕</button>
              </div>
            ))
          )}
        </div>
      </div>

      {picks.length > 0 && (
        <div className="card">
          <div className="card-title">Session Summary</div>
          <div className="summary-grid">
            <div className="summary-box">
              <div className="summary-label">Meals Picked</div>
              <div className="summary-num">{picks.length}</div>
            </div>
            <div className="summary-box">
              <div className="summary-label">Est. Spend</div>
              <div className="summary-num">Ksh {total.toLocaleString()}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
