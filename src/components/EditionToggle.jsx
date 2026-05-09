import React from "react";

export function EditionToggle({ edition, options, onChange }) {
  return (
    <div className="toggle-group" role="tablist" aria-label="edition">
      {Object.entries(options).map(([value, label]) => (
        <button
          key={value}
          className={value === edition ? "toggle-button active" : "toggle-button"}
          onClick={() => onChange(value)}
          role="tab"
          aria-selected={value === edition}
          type="button"
        >
          {label}
        </button>
      ))}
    </div>
  );
}
