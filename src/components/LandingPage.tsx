interface LandingPageProps {
  onOpenGame: () => void;
}

const uiAssets = `${import.meta.env.BASE_URL}assets/ui`;
const catalogAssets = `${import.meta.env.BASE_URL}assets/catalog`;

export default function LandingPage({ onOpenGame }: LandingPageProps) {
  const showSpeaking = true;
  const showReading = true;
  const showMath = true;

  return (
    <main className="hub-page">
      <header className="hub-header">
        <a className="hub-brand" href="#library" aria-label="Mood Lab home">
          <img src={`${import.meta.env.BASE_URL}mood-lab-icon.png`} alt="Mood Lab cat and dog" />
          <span><b>MOOD LAB</b><small>Learning games</small></span>
        </a>
        <section className="hub-intro">
          <p className="hub-eyebrow">PLAY · SPEAK · LEARN</p>
          <h1>Games that help<br />you learn</h1>
          <p>Choose a topic and start playing. Every game is free, classroom-ready and works on a computer, tablet or projector.</p>
        </section>
        <nav className="hub-nav" aria-label="Main navigation">
          <a href="#library">Games</a>
          <span>English · Ages 6+</span>
        </nav>
      </header>

      <section className="hub-library" id="library">
        <div className="hub-library-heading"><h2>Library</h2><span>6 games</span></div>
        <div className="hub-grid">
          {showSpeaking && (
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

          {showSpeaking && (
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

          {showReading && (
            <article className="hub-card">
              <div className="hub-card-cover themed-cover reading-cover" style={{ '--card-background': `url(${catalogAssets}/reading-bg.jpg)` } as React.CSSProperties}>
                <span className="hub-free">FREE</span>
                <button className="hub-bookmark" aria-label="Save Reading: Right or Wrong">♡</button>
                <div className="hub-theme-title"><small>PHONICS CHALLENGE</small><strong>RIGHT<br />OR WRONG?</strong></div>
              </div>
              <div className="hub-card-body">
                <h3>Reading: Right or Wrong</h3>
                <div className="hub-tags"><span>Phonics</span><span>Reading</span><span>Timed practice</span></div>
                <p>Read real and pseudo-words, recognise phonics patterns and choose right or wrong.</p>
                <a className="hub-play" href="https://istmvera2092-sys.github.io/Readingmaintr/">PLAY GAME <span>→</span></a>
              </div>
            </article>
          )}

          {showReading && (
            <article className="hub-card">
              <div className="hub-card-cover themed-cover letters-cover" style={{ '--card-background': `url(${catalogAssets}/letters-bg.jpg)` } as React.CSSProperties}>
                <span className="hub-free">FREE</span>
                <button className="hub-bookmark" aria-label="Save Learn Letters">♡</button>
                <img className="hub-game-logo" src={`${catalogAssets}/letters-logo.png`} alt="Learn Letters" />
              </div>
              <div className="hub-card-body">
                <h3>Learn Letters</h3>
                <div className="hub-tags"><span>Beginner</span><span>Phonics</span><span>Handwriting</span></div>
                <p>Practise letter sounds and handwriting in a bright magical classroom.</p>
                <a className="hub-play" href="https://itstxaviers-svg.github.io/HPLetters/#/">PLAY GAME <span>→</span></a>
              </div>
            </article>
          )}

          {showMath && (
            <article className="hub-card">
              <div className="hub-card-cover themed-cover math-cover" style={{ '--card-background': `url(${catalogAssets}/math-bg.jpg)` } as React.CSSProperties}>
                <span className="hub-free">FREE</span>
                <button className="hub-bookmark" aria-label="Save Math Practice Drills">♡</button>
                <div className="hub-theme-title"><small>WINTER ARENA</small><strong>MATH<br />PRACTICE</strong></div>
              </div>
              <div className="hub-card-body">
                <h3>Math Practice Drills</h3>
                <div className="hub-tags"><span>Math</span><span>Mental arithmetic</span><span>Timed practice</span></div>
                <p>Solve quick arithmetic challenges and build speed in a magical winter arena.</p>
                <a className="hub-play" href="https://istmvera2092-sys.github.io/math/">PLAY GAME <span>→</span></a>
              </div>
            </article>
          )}

          <article className="hub-card">
            <div className="hub-card-cover themed-cover sentence-cover" style={{ '--card-background': `url(${catalogAssets}/sentence-stacker-bg.jpg)` } as React.CSSProperties}>
              <span className="hub-free">FREE</span>
              <button className="hub-bookmark" aria-label="Save Sentence Stacker">♡</button>
              <div className="hub-theme-title"><small>GRAMMAR BUILDER</small><strong>SENTENCE<br />STACKER</strong></div>
            </div>
            <div className="hub-card-body">
              <h3>Sentence Stacker</h3>
              <div className="hub-tags"><span>Grammar</span><span>Word order</span><span>Fast-paced</span></div>
              <p>Build correct English sentences and raise a tower in a fast-paced grammar challenge.</p>
              <a className="hub-play" href="https://itstxaviers-svg.github.io/sentst/">PLAY GAME <span>→</span></a>
            </div>
          </article>
        </div>
      </section>

      <footer className="hub-footer"><span><b>MOOD LAB</b> · Learning games for young English speakers</span><span>Free to play</span></footer>
    </main>
  );
}
