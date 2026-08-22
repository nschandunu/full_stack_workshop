import React from "react";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "activity", label: "Activity" },
  { id: "settings", label: "Settings" },
];

/**
 * ProfileTabs – accessible tab bar. Keyboard: arrow keys to switch tabs.
 */
export default function ProfileTabs({ active, onChange }) {
  const handleKeyDown = (e, id) => {
    const ids = TABS.map((t) => t.id);
    const idx = ids.indexOf(id);
    if (e.key === "ArrowRight") onChange(ids[(idx + 1) % ids.length]);
    if (e.key === "ArrowLeft") onChange(ids[(idx - 1 + ids.length) % ids.length]);
  };

  return (
    <nav className="pt-nav" aria-label="Profile sections">
      <div className="pt-bar" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={active === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={active === tab.id ? 0 : -1}
            className={`pt-tab${active === tab.id ? " pt-tab--active" : ""}`}
            onClick={() => onChange(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="pt-divider" aria-hidden="true" />
    </nav>
  );
}
