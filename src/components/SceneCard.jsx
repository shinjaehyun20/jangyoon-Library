import React from "react";
import { useState } from "react";

function SceneArt({ scene, index }) {
  const [imageReady, setImageReady] = useState(true);
  const styles = {
    "--sky-top": scene.palette.skyTop,
    "--sky-bottom": scene.palette.skyBottom,
    "--hill": scene.palette.hill,
    "--accent": scene.palette.accent,
    "--cloud": scene.palette.cloud,
    "--sun": scene.palette.sun
  };
  const sceneImage = `${import.meta.env.BASE_URL}illustrations/volume-01/${scene.id}.png`;

  return (
    <div className="scene-art" style={styles} aria-hidden="true">
      {imageReady ? (
        <img
          className="scene-art-image"
          src={sceneImage}
          alt={`${scene.titleKr} 삽화`}
          onError={() => setImageReady(false)}
        />
      ) : (
        <>
          <div className="scene-art-sky"></div>
          <div className="scene-art-sun"></div>
          <div className="scene-art-cloud cloud-a"></div>
          <div className="scene-art-cloud cloud-b"></div>
          <div className="scene-art-hill"></div>
          <div className={`scene-art-traveler pose-${index % 4}`}>
            <div className="head"></div>
            <div className="body"></div>
            <div className="coat"></div>
          </div>
          <div className={`scene-art-wind swirl-${(index % 3) + 1}`}></div>
        </>
      )}
      <div className="scene-art-caption">{scene.visualLabel}</div>
    </div>
  );
}

export function SceneCard({
  scene,
  edition,
  index,
  total,
  isActive,
  isEven,
  onActivate
}) {
  return (
    <article
      id={scene.id}
      className={`${isActive ? "scene-card active" : "scene-card"}${isEven ? " reverse" : ""}`}
      onMouseEnter={onActivate}
    >
      <div className="scene-copy">
        <div className="scene-header">
          <p className="scene-count">
            장면 {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
          <div>
            <h3>{scene.titleKr}</h3>
            <p className="scene-title-en">{scene.titleEn}</p>
          </div>
        </div>

        <div className="story-block">
          {scene.kr.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {edition === "bilingual" && (
          <div className="translation-block">
            <p className="translation-label">English helper</p>
            {scene.en.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="vocab-line">
              <strong>Word hint:</strong> {scene.wordHint}
            </p>
          </div>
        )}
      </div>

      <div className="scene-visual">
        <SceneArt scene={scene} index={index} />
      </div>
    </article>
  );
}
