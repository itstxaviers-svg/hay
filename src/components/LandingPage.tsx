const uiAssets = `${import.meta.env.BASE_URL}assets/ui`;
const catalogAssets = `${import.meta.env.BASE_URL}assets/catalog`;
const gameLinks = {
  emotions: `${import.meta.env.BASE_URL}#game`,
  abilities: 'https://itstxaviers-svg.github.io/Ican/',
  reading: 'https://istmvera2092-sys.github.io/Readingmaintr/',
  letters: 'https://itstxaviers-svg.github.io/HPLetters/#/',
  math: 'https://itstxaviers-svg.github.io/maths/',
  sentences: 'https://itstxaviers-svg.github.io/sentst/',
  time: 'https://istmvera2092-sys.github.io/HPttt/',
  restaurant: 'https://istmvera2092-sys.github.io/reast-/',
};

export default function LandingPage() {
  const showSpeaking = true;
  const showReading = true;
  const showMath = true;

  return (
    <main className="hub-page">
      <section className="hub-intro">
        <a className="hub-brand" href="#library" aria-label="Mood Lab home">
          <img src={`${import.meta.env.BASE_URL}mood-lab-icon.png`} alt="Mood Lab cat and dog" />
          <span><b>MOOD LAB</b><small>Learning games</small></span>
        </a>
        <p className="hub-eyebrow">PLAY · SPEAK · LEARN</p>
      </section>

      <section className="hub-library" id="library">
        <div className="hub-library-heading"><h2>Library</h2><span>8 games</span></div>
        <div className="hub-grid">
          {showSpeaking && (
            <article className="hub-card">
              <a className="hub-card-cover emotion-cover" href={gameLinks.emotions} target="_blank" rel="noopener noreferrer" aria-label="Play How Are You? in a new tab" style={{ '--card-background': `url(${uiAssets}/emotion-world.jpg)` } as React.CSSProperties}>
                <span className="hub-free">FREE</span>
                <span className="hub-cover-open" aria-hidden="true">↗</span>
                <div className="hub-cover-title"><small>EMOTION WORLD</small><strong>HOW ARE YOU?</strong></div>
                <img className="hub-cover-character" src={`${uiAssets}/menu-characters/story-portal.png`} alt="" />
              </a>
              <div className="hub-card-body">
                <h3>How Are You?</h3>
                <div className="hub-tags"><span>Beginner</span><span>Speaking</span><span>Emotions</span></div>
                <p>Explore eight feelings through quick speaking, memory and story games.</p>
                <a className="hub-play" href={gameLinks.emotions} target="_blank" rel="noopener noreferrer">PLAY GAME <span>→</span></a>
              </div>
            </article>
          )}

          {showSpeaking && (
            <article className="hub-card">
              <a className="hub-card-cover image-cover" href={gameLinks.abilities} target="_blank" rel="noopener noreferrer" aria-label="Play I Can! in a new tab">
                <img src={`${catalogAssets}/ican-cover.jpg`} alt="A superhero cat and dog discovering actions" />
                <span className="hub-free">FREE</span>
                <span className="hub-cover-open" aria-hidden="true">↗</span>
              </a>
              <div className="hub-card-body">
                <h3>I Can!</h3>
                <div className="hub-tags"><span>Beginner</span><span>Action verbs</span><span>Abilities</span></div>
                <p>Train “I can” phrases in three superhero missions with a cat and dog.</p>
                <a className="hub-play" href={gameLinks.abilities} target="_blank" rel="noopener noreferrer">PLAY GAME <span>→</span></a>
              </div>
            </article>
          )}

          {showReading && (
            <article className="hub-card">
              <a className="hub-card-cover themed-cover reading-cover" href={gameLinks.reading} target="_blank" rel="noopener noreferrer" aria-label="Play Reading: Right or Wrong in a new tab" style={{ '--card-background': `url(${catalogAssets}/reading-bg.jpg)` } as React.CSSProperties}>
                <span className="hub-free">FREE</span>
                <span className="hub-cover-open" aria-hidden="true">↗</span>
                <div className="hub-theme-title"><small>PHONICS CHALLENGE</small><strong>RIGHT<br />OR WRONG?</strong></div>
              </a>
              <div className="hub-card-body">
                <h3>Reading: Right or Wrong</h3>
                <div className="hub-tags"><span>Phonics</span><span>Reading</span><span>Timed practice</span></div>
                <p>Read real and pseudo-words, recognise phonics patterns and choose right or wrong.</p>
                <a className="hub-play" href={gameLinks.reading} target="_blank" rel="noopener noreferrer">PLAY GAME <span>→</span></a>
              </div>
            </article>
          )}

          {showReading && (
            <article className="hub-card">
              <a className="hub-card-cover themed-cover letters-cover" href={gameLinks.letters} target="_blank" rel="noopener noreferrer" aria-label="Play Learn Letters in a new tab" style={{ '--card-background': `url(${catalogAssets}/letters-bg.jpg)` } as React.CSSProperties}>
                <span className="hub-free">FREE</span>
                <span className="hub-cover-open" aria-hidden="true">↗</span>
                <img className="hub-game-logo" src={`${catalogAssets}/letters-logo.png`} alt="Learn Letters" />
              </a>
              <div className="hub-card-body">
                <h3>Learn Letters</h3>
                <div className="hub-tags"><span>Beginner</span><span>Phonics</span><span>Handwriting</span></div>
                <p>Practise letter sounds and handwriting in a bright magical classroom.</p>
                <a className="hub-play" href={gameLinks.letters} target="_blank" rel="noopener noreferrer">PLAY GAME <span>→</span></a>
              </div>
            </article>
          )}

          {showMath && (
            <article className="hub-card">
              <a className="hub-card-cover themed-cover math-cover" href={gameLinks.math} target="_blank" rel="noopener noreferrer" aria-label="Play Math Practice Drills in a new tab" style={{ '--card-background': `url(${catalogAssets}/math-bg.jpg)` } as React.CSSProperties}>
                <span className="hub-free">FREE</span>
                <span className="hub-cover-open" aria-hidden="true">↗</span>
                <div className="hub-theme-title"><small>WINTER ARENA</small><strong>MATH<br />PRACTICE</strong></div>
              </a>
              <div className="hub-card-body">
                <h3>Math Practice Drills</h3>
                <div className="hub-tags"><span>Math</span><span>Mental arithmetic</span><span>Timed practice</span></div>
                <p>Solve quick arithmetic challenges and build speed in a magical winter arena.</p>
                <a className="hub-play" href={gameLinks.math} target="_blank" rel="noopener noreferrer">PLAY GAME <span>→</span></a>
              </div>
            </article>
          )}

          <article className="hub-card">
            <a className="hub-card-cover themed-cover sentence-cover" href={gameLinks.sentences} target="_blank" rel="noopener noreferrer" aria-label="Play Sentence Stacker in a new tab" style={{ '--card-background': `url(${catalogAssets}/sentence-stacker-bg.jpg)` } as React.CSSProperties}>
              <span className="hub-free">FREE</span>
              <span className="hub-cover-open" aria-hidden="true">↗</span>
              <div className="hub-theme-title"><small>GRAMMAR BUILDER</small><strong>SENTENCE<br />STACKER</strong></div>
            </a>
            <div className="hub-card-body">
              <h3>Sentence Stacker</h3>
              <div className="hub-tags"><span>Grammar</span><span>Word order</span><span>Fast-paced</span></div>
              <p>Build correct English sentences and raise a tower in a fast-paced grammar challenge.</p>
              <a className="hub-play" href={gameLinks.sentences} target="_blank" rel="noopener noreferrer">PLAY GAME <span>→</span></a>
            </div>
          </article>

          <article className="hub-card">
            <a className="hub-card-cover themed-cover time-cover" href={gameLinks.time} target="_blank" rel="noopener noreferrer" aria-label="Play Tic-Tac-Toe: What time is it? in a new tab" style={{ '--card-background': `url(${catalogAssets}/tic-tac-toe-bg.jpg)` } as React.CSSProperties}>
              <span className="hub-free">FREE</span>
              <span className="hub-cover-open" aria-hidden="true">↗</span>
              <div className="hub-theme-title"><small>WHAT TIME IS IT?</small><strong>TIC-TAC-TOE</strong></div>
            </a>
            <div className="hub-card-body">
              <h3>Tic-Tac-Toe: Time Trainer</h3>
              <div className="hub-tags"><span>Time</span><span>English</span><span>Strategy</span></div>
              <p>Practise telling the time while playing tic-tac-toe and choosing clock levels.</p>
              <a className="hub-play" href={gameLinks.time} target="_blank" rel="noopener noreferrer">PLAY GAME <span>→</span></a>
            </div>
          </article>

          <article className="hub-card">
            <a className="hub-card-cover themed-cover restaurant-cover" href={gameLinks.restaurant} target="_blank" rel="noopener noreferrer" aria-label="Play Restaurant: English Menu Game in a new tab" style={{ '--card-background': `url(${catalogAssets}/restaurant-bg.webp)` } as React.CSSProperties}>
              <span className="hub-free">FREE</span>
              <span className="hub-cover-open" aria-hidden="true">↗</span>
              <div className="hub-theme-title"><small>ENGLISH MENU GAME</small><strong>RESTAURANT</strong></div>
            </a>
            <div className="hub-card-body">
              <h3>Restaurant</h3>
              <div className="hub-tags"><span>Food</span><span>Vocabulary</span><span>Speaking</span></div>
              <p>Practise food and drink words through a playful English restaurant game.</p>
              <a className="hub-play" href={gameLinks.restaurant} target="_blank" rel="noopener noreferrer">PLAY GAME <span>→</span></a>
            </div>
          </article>
        </div>
      </section>

      <footer className="hub-footer"><span><b>MOOD LAB</b> · Learning games for young English speakers</span><span>Free to play</span></footer>
    </main>
  );
}
