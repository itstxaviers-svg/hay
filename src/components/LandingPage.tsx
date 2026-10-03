import { useState } from 'react';

interface LandingPageProps {
  onOpenGame: () => void;
}

type Filter = 'all' | 'free' | 'emotions' | 'abilities';

const uiAssets = `${import.meta.env.BASE_URL}assets/ui`;
const catalogAssets = `${import.meta.env.BASE_URL}assets/catalog`;

export default function LandingPage({ onOpenGame }: LandingPageProps) {
  const [filter, setFilter] = useState<Filter>('all');
  const showEmotions = filter === 'all' || filter === 'free' || filter === 'emotions';
  const showAbilities = filter === 'all' || filter === 'free' || filter === 'abilities';
  const visibleCount = Number(showEmotions) + Number(showAbilities);

  return (
    <main className="hub-page">
      <header className="hub-header">
        <a className="hub-brand" href="#library" aria-label="Mood Lab home">
          <img src={`${import.meta.env.BASE_URL}mood-lab-icon.png`} alt="Mood Lab cat and dog" />
          <span><b>MOOD LAB</b><small>Learning games</small></span>
        </a>
        <nav className="hub-nav" aria-label="Main navigation">
          <a href="#library">Games</a>
          <span>English · Ages 6+</span>
        </nav>
      </header>

      <section className="hub-intro">
        <p className="hub-eyebrow">PLAY · SPEAK · LEARN</p>
        <h1>Games that help<br />you learn</h1>
        <p>Choose a topic and start playing. Every game is free, classroom-ready and works on a computer, tablet or projector.</p>
      </section>

      <section className="hub-controls" aria-label="Game filters">
        <div className="hub-filters">
          {([
            ['all', 'All'],
            ['free', 'Free'],
            ['emotions', 'Emotions'],
            ['abilities', 'Abilities'],
          ] as [Filter, string][]).map(([id, label]) => (
            <button key={id} className={filter === id ? 'active' : ''} onClick={() => setFilter(id)}>{label}</button>
          ))}
        </div>
        <label className="hub-sort">Sort games
          <select defaultValue="newest"><option value="newest">Newest first</option><option value="az">Name A–Z</option></select>
        </label>
      </section>

      <section className="hub-library" id="library">
        <div className="hub-library-heading"><h2>Library</h2><span>{visibleCount} {visibleCount === 1 ? 'game' : 'games'}</span></div>
        <div className="hub-grid">
          {showEmotions && (
            <article className="hub-card">
              <div className="hub-card-cover emotion-cover" style={{ '--card-background': `url(${uiAssets}/emotion-world.jpg)` } as React.CSSProperties}>
                <span className="hub-free">FREE</span>
                <button className="hub-bookmark" aria-label="Save How Are You?">♡</button>
                <div className="hub-cover-title"><small>EMOTION WORLD</small><strong>HOW ARE YOU?</strong></div>
                <img className="hub-cover-character" src={`${uiAssets}/menu-characters/story-portal.png`} alt="" />
              </div>
              <div className="hub-card-body">
                <h3>How Are You?</h3>
                <div className="hub-tags"><span>Beginner</span><span>Speaking</span><span>Emotions</span></div>
                <p>Explore eight feelings through quick speaking, memory and story games.</p>
                <button className="hub-play" onClick={onOpenGame}>PLAY GAME <span>→</span></button>
              </div>
            </article>
          )}

          {showAbilities && (
            <article className="hub-card">
              <div className="hub-card-cover image-cover">
                <img src={`${catalogAssets}/ican-cover.jpg`} alt="A superhero cat and dog discovering actions" />
                <span className="hub-free">FREE</span>
                <button className="hub-bookmark" aria-label="Save I Can!">♡</button>
              </div>
              <div className="hub-card-body">
                <h3>I Can!</h3>
                <div className="hub-tags"><span>Beginner</span><span>Action verbs</span><span>Abilities</span></div>
                <p>Train “I can” phrases in three superhero missions with a cat and dog.</p>
                <a className="hub-play" href="https://itstxaviers-svg.github.io/Ican/">PLAY GAME <span>→</span></a>
              </div>
            </article>
          )}
        </div>
        {visibleCount === 0 && <p className="hub-empty">No games found.</p>}
      </section>

      <footer className="hub-footer"><span><b>MOOD LAB</b> · Learning games for young English speakers</span><span>Free to play</span></footer>
    </main>
  );
}
