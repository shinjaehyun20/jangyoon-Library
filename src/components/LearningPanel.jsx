import React from "react";

export function LearningPanel({ book, currentScene }) {
  return (
    <section className="panel">
      <h2>학습 포인트</h2>
      <p className="learning-theme">{book.metadata.learningTheme}</p>
      <ul className="learning-list">
        {currentScene.learningPoints.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <div className="mini-note">
        <strong>부모/교사 메모</strong>
        <p>{currentScene.parentGuide}</p>
      </div>
    </section>
  );
}
