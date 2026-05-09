import React, { useEffect, useMemo, useRef, useState } from "react";
import book from "./data/books/north-wind-and-the-sun.json";
import { BookHero } from "./components/BookHero.jsx";
import { EditionToggle } from "./components/EditionToggle.jsx";
import { ProgressNav } from "./components/ProgressNav.jsx";
import { SceneCard } from "./components/SceneCard.jsx";
import { LearningPanel } from "./components/LearningPanel.jsx";

const EDITIONS = {
  kr: "KR 읽기판",
  bilingual: "KR-EN 병기판"
};

export default function App() {
  const initialEdition =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("edition")
      : "kr";

  const [edition, setEdition] = useState(
    initialEdition && EDITIONS[initialEdition] ? initialEdition : "kr"
  );
  const [activeSceneId, setActiveSceneId] = useState(book.scenes[0].id);
  const hasMountedSceneNav = useRef(false);

  const activeIndex = useMemo(
    () => book.scenes.findIndex((scene) => scene.id === activeSceneId),
    [activeSceneId]
  );

  const currentScene = book.scenes[activeIndex] ?? book.scenes[0];

  useEffect(() => {
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    const section = document.getElementById(activeSceneId);
    if (!section) {
      return;
    }

    if (!hasMountedSceneNav.current) {
      hasMountedSceneNav.current = true;
      return;
    }

    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [activeSceneId]);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("edition", edition);
    window.history.replaceState({}, "", url);
  }, [edition]);

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Jangyoon Library</p>
          <h1>읽고 상상하고 따라 말하는 작은 도서관</h1>
        </div>
        <div className="topbar-actions">
          <EditionToggle
            edition={edition}
            options={EDITIONS}
            onChange={setEdition}
          />
          <button
            className="print-button"
            onClick={() => window.print()}
            type="button"
          >
            PDF로 저장
          </button>
        </div>
      </header>

      <main>
        <BookHero book={book} editionLabel={EDITIONS[edition]} />

        <section className="storybook-intro">
          <div className="intro-card intro-reading">
            <p className="eyebrow">Reading Flow</p>
            <h2>혼자 읽어도 길을 잃지 않는 그림책</h2>
            <p>
              한 장면마다 한 감정, 한 행동만 먼저 보이게 배치했습니다.
              그래서 아이가 글을 다 읽기 전에도 그림만 보고 상황을 짐작할 수 있어요.
            </p>
          </div>
          <div className="intro-card intro-lesson">
            <p className="eyebrow">Lesson</p>
            <h2>따뜻한 말이 더 큰 힘이 될 수 있어</h2>
            <p>
              북풍과 해님의 승부를 따라가며, 세게 밀어붙이는 것보다 부드럽게 마음을 움직이는 방법을 배우게 됩니다.
            </p>
          </div>
        </section>

        <section className="workspace-grid" aria-label="storybook workspace">
          <aside className="sidebar">
            <div className="panel sticky-panel">
              <h2>권 정보</h2>
              <dl className="meta-list">
                <div>
                  <dt>대상</dt>
                  <dd>{book.metadata.targetAge}</dd>
                </div>
                <div>
                  <dt>학습 주제</dt>
                  <dd>{book.metadata.learningTheme}</dd>
                </div>
                <div>
                  <dt>원전</dt>
                  <dd>{book.metadata.source.title}</dd>
                </div>
                <div>
                  <dt>공개 사용 근거</dt>
                  <dd>{book.metadata.source.usageBasis}</dd>
                </div>
                <div>
                  <dt>발간일</dt>
                  <dd>{book.metadata.publishedAt}</dd>
                </div>
              </dl>
            </div>

            <ProgressNav
              scenes={book.scenes}
              activeSceneId={activeSceneId}
              onSelect={setActiveSceneId}
            />

            <LearningPanel book={book} currentScene={currentScene} />
          </aside>

          <section className="reader-column">
            {book.scenes.map((scene, index) => (
              <SceneCard
                key={scene.id}
                scene={scene}
                edition={edition}
                index={index}
                total={book.scenes.length}
                isActive={scene.id === activeSceneId}
                isEven={index % 2 === 1}
                onActivate={() => setActiveSceneId(scene.id)}
              />
            ))}
          </section>
        </section>
      </main>
    </div>
  );
}
