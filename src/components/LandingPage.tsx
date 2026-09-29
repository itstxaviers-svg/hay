interface LandingPageProps {
  onOpenGame: () => void;
}

const uiAssets = `${import.meta.env.BASE_URL}assets/ui`;

export default function LandingPage({ onOpenGame }: LandingPageProps) {
  return (
    <main className="catalog-page">
      <header className="catalog-header">
        <a className="catalog-brand" href="#catalog" aria-label="Mood Lab — главная">
          <span>H</span>
          <div><b>MOOD LAB</b><small>English games</small></div>
        </a>
        <nav className="catalog-nav" aria-label="Навигация">
          <a href="#catalog">Игры</a>
          <a href="#about">О проекте</a>
        </nav>
        <button className="catalog-header-button" onClick={onOpenGame}>Играть</button>
      </header>

      <section className="catalog-hero" id="about">
        <div className="catalog-hero-copy">
          <p className="catalog-kicker"><i /> Учим английский через игру</p>
          <h1>Игры, которые помогают <span>говорить</span></h1>
          <p className="catalog-lead">Яркие задания для урока, проектора и домашней практики. Смотрим, называем эмоции и отвечаем полным предложением.</p>
          <div className="catalog-hero-actions">
            <button className="catalog-primary" onClick={onOpenGame}>Открыть игру <span>→</span></button>
            <a className="catalog-secondary" href="#catalog">Посмотреть описание</a>
          </div>
          <div className="catalog-facts" aria-label="Особенности игры">
            <span><b>3</b> режима</span>
            <span><b>8</b> эмоций</span>
            <span><b>A1</b> уровень</span>
          </div>
        </div>

        <div className="catalog-hero-visual" style={{ '--hero-world': `url(${uiAssets}/emotion-world.jpg)` } as React.CSSProperties} aria-hidden="true">
          <div className="catalog-orbit orbit-one" />
          <div className="catalog-orbit orbit-two" />
          <img className="catalog-mascot catalog-dog" src={`${uiAssets}/menu-characters/dog-snap.png`} alt="" />
          <img className="catalog-mascot catalog-cat" src={`${uiAssets}/menu-characters/cat-memory.png`} alt="" />
          <span className="catalog-word word-one">HAPPY</span>
          <span className="catalog-word word-two">GREAT!</span>
        </div>
      </section>

      <section className="catalog-library" id="catalog">
        <div className="catalog-section-heading">
          <div><p>Библиотека</p><h2>Выберите игру</h2></div>
          <span>1 игра</span>
        </div>

        <article className="catalog-game-card">
          <div className="catalog-game-cover" style={{ '--cover-image': `url(${uiAssets}/emotion-world.jpg)` } as React.CSSProperties}>
            <div className="catalog-cover-shade" />
            <span className="catalog-free-badge">Бесплатно</span>
            <div className="catalog-cover-title"><small>Emotion speaking game</small><strong>HOW ARE YOU?</strong></div>
            <img src={`${uiAssets}/menu-characters/story-portal.png`} alt="" />
          </div>
          <div className="catalog-game-content">
            <div className="catalog-tags"><span>Английский</span><span>A1</span><span>Эмоции</span><span>Говорение</span></div>
            <h3>How Are You?</h3>
            <p>Три короткие игры для тренировки фраз <b>“I’m happy”, “I’m tired”, “I’m hungry”</b> и других эмоциональных состояний.</p>
            <ul>
              <li>Подходит для большого экрана и проектора</li>
              <li>Озвучка, память и сюжетные подсказки</li>
              <li>Командный режим для урока</li>
            </ul>
            <button className="catalog-card-button" onClick={onOpenGame}>Перейти к игре <span>▶</span></button>
          </div>
        </article>
      </section>

      <footer className="catalog-footer"><b>MOOD LAB</b><span>Игровая практика английского · 6+</span></footer>
    </main>
  );
}
