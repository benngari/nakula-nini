import { useState } from "react";
import { MEALS } from "../data/meals";
import FilterBar from "./FilterBar";

export default function FullMenuPanel({ onQuickSelect }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? MEALS : MEALS.filter((m) => m.time === filter);

  return (
    <div className="panel">
      <FilterBar active={filter} onChange={setFilter} />
      <div className="menu-grid">
        {filtered.map((m) => (
          <div className="menu-item" key={m.id} onClick={() => onQuickSelect(m)}>
            <span className="menu-emoji">{m.emoji}</span>
            <div className="menu-info">
              <div className="menu-name">{m.name}</div>
              <div className="menu-detail">{m.cost} · {m.where}</div>
              <div className="menu-tags">
                <span className={`tag tag--${m.time}`}>{m.time}</span>
                <span className="tag tag--neutral">{m.protein} protein</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
