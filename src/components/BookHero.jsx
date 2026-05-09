import React from "react";
import { useState } from "react";

const coverImage = `${import.meta.env.BASE_URL}illustrations/volume-01/cover.png`;

export function BookHero({ book, editionLabel }) {
  const [imageReady, setImageReady] = useState(true);

  return (
    <section className="hero-card">
      <div className="hero-copy">
        <p className="eyebrow">Volume 01 · Story Shelf</p>
        <h2>{book.metadata.titleKr}</h2>
        <p className="hero-subtitle">{book.metadata.titleEn}</p>
        <p className="hero-description">{book.metadata.summary}</p>
        <p className="hero-reading-note">
          아이가 혼자 읽어도 장면이 바로 이해되도록, 짧은 문장과 따뜻한 3D 삽화 중심으로 구성했어요.
        </p>
        <div className="hero-tags">
          <span>{editionLabel}</span>
          <span>{book.scenes.length}개 장면</span>
          <span>격주 발간</span>
        </div>
      </div>
      <div className="cover-art" aria-hidden="true">
        {imageReady ? (
          <img
            className="cover-art-image"
            src={coverImage}
            alt={`${book.metadata.titleKr} 표지 삽화`}
            onError={() => setImageReady(false)}
          />
        ) : (
          <>
            <div className="cover-sun"></div>
            <div className="cover-cloud cloud-left"></div>
            <div className="cover-cloud cloud-right"></div>
            <div className="cover-hill hill-back"></div>
            <div className="cover-hill hill-front"></div>
            <div className="cover-traveler">
              <div className="traveler-head"></div>
              <div className="traveler-body"></div>
              <div className="traveler-coat"></div>
            </div>
          </>
        )}
        <div className="cover-art-badge">sample illustrated cover</div>
      </div>
    </section>
  );
}
