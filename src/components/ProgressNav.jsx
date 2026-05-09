import React from "react";

export function ProgressNav({ scenes, activeSceneId, onSelect }) {
  return (
    <nav className="panel" aria-label="scene navigation">
      <h2>장면 이동</h2>
      <ol className="scene-nav">
        {scenes.map((scene, index) => (
          <li key={scene.id}>
            <button
              className={scene.id === activeSceneId ? "scene-link active" : "scene-link"}
              onClick={() => onSelect(scene.id)}
              type="button"
            >
              <span className="scene-step">{String(index + 1).padStart(2, "0")}</span>
              <span className="scene-label">{scene.titleKr}</span>
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
