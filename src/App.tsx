import { useCallback, useEffect, useState } from 'react';
import EndScreen from './components/EndScreen';
import GameLayout from './components/GameLayout';
import MoodSnap from './games/MoodSnap';
import WhatsMissing from './games/WhatsMissing';
import MonkeyRescue from './games/MonkeyRescue';
import { emotions } from './data/emotions';
import type { Scores, Settings } from './types';

type GameId = 'snap' | 'missing' | 'rescue';
type View = 'menu' | 'settings' | 'game' | 'end';

const uiAssets = `${import.meta.env.BASE_URL}assets/ui`;
const gameInfo: Record<GameId, { title: string; number: string; subtitle: string; character: string; color: string }> = {
  snap: { title: 'Mood Snap', number: '01', subtitle: 'See it. Say it. Snap!', character: `${uiAssets}/menu-characters/mood-snap.png`, color: 'yellow' },
  missing: { title: "What's Missing?", number: '02', subtitle: 'Look, remember, speak!', character: `${uiAssets}/menu-characters/memory-vault.png`, color: 'blue' },
  rescue: { title: 'Monkey Rescue', number: '03', subtitle: 'Spot the clue. Name the feeling!', character: `${uiAssets}/menu-characters/story-portal.png`, color: 'coral' },
};

const defaults: Settings = { sound: true, rounds: 10, teamMode: false, hardMode: false };
const emptyScores: Scores = { banana: 0, coconut: 0 };
const emotionWorld = `${uiAssets}/emotion-world.jpg`;
const preloadedGames = new Set<GameId>();

function preloadGameAssets(id: GameId) {
  if (preloadedGames.has(id)) return;
  preloadedGames.add(id);

  emotions.forEach((emotion) => {
    const image = new Image();
    image.decoding = 'async';
    image.src = emotion.image;
    void image.decode().catch(() => undefined);
    const audio = new Audio(emotion.audio);
    audio.preload = 'auto';
  });

  if (id === 'rescue') {
    window.setTimeout(() => {
      emotions.forEach((emotion) => {
        [1, 2, 3].forEach((variant) => {
          const situation = new Image();
          situation.decoding = 'async';
          situation.src = `${import.meta.env.BASE_URL}assets/situations/${emotion.id}-${variant}.jpg`;
        });
      });
    }, 300);
  }
}

function loadSettings(): Settings {
  try {
    return { ...defaults, ...JSON.parse(localStorage.getItem('hay-settings') ?? '{}') };
  } catch {
    return defaults;
  }
}

export default function App() {
  const [view, setView] = useState<View>('menu');
  const [game, setGame] = useState<GameId>('snap');
  const [settings, setSettings] = useState(loadSettings);
  const [scores, setScores] = useState<Scores>(emptyScores);
  const [progress, setProgress] = useState({ round: 1, streak: 0 });
  const [gameKey, setGameKey] = useState(0);

  useEffect(() => {
    localStorage.setItem('hay-settings', JSON.stringify(settings));
  }, [settings]);

  const startGame = (id: GameId) => {
    preloadGameAssets(id);
    setGame(id);
    setScores(emptyScores);
    setProgress({ round: 1, streak: 0 });
    setGameKey((key) => key + 1);
    setView('game');
  };
  const toMenu = useCallback(() => {
    window.speechSynthesis?.cancel();
    setView('menu');
  }, []);
  const finish = () => setView('end');
  const playAgain = () => startGame(game);
  const onProgress = useCallback((round: number, streak: number) => setProgress({ round, streak }), []);

  const CurrentGame = game === 'snap' ? MoodSnap : game === 'missing' ? WhatsMissing : MonkeyRescue;

  if (view === 'end') {
    return <EndScreen title={gameInfo[game].title} settings={settings} scores={scores} onAgain={playAgain} onHome={toMenu} />;
  }

  if (view === 'game') {
    return (
      <GameLayout title={gameInfo[game].title} round={progress.round} streak={progress.streak} settings={settings} scores={scores} onScoresChange={setScores} onHome={toMenu}>
        <CurrentGame key={gameKey} settings={settings} onFinish={finish} onProgress={onProgress} />
      </GameLayout>
    );
  }

  return (
    <main className="home-screen emotion-world" style={{ '--emotion-world': `url(${emotionWorld})` } as React.CSSProperties}>
      <div className="background-doodles" aria-hidden="true"><span>✦</span><span>●</span><span>☁</span><span>✦</span><span>●</span></div>
      <div className="memory-stream" aria-hidden="true">
        {Array.from({ length: 11 }, (_, index) => <i key={index} style={{ '--orb': index } as React.CSSProperties} />)}
      </div>
      <header className="home-header">
        <div className="brand-mark"><span>H</span><div><b>Mood Lab</b><small>Imagination HQ</small></div></div>
        <button className="settings-button" onClick={() => setView('settings')} aria-label="Open settings">⚙ <span>Settings</span></button>
      </header>
      <section className="hero-copy">
        <p className="eyebrow"><i /> Welcome to your emotion world <i /></p>
        <h1>HOW ARE <span>YOU?</span></h1>
        <p>Explore the feeling. Find the words. Light up a memory!</p>
      </section>
      <section className="game-menu" aria-label="Choose a game">
        {(Object.keys(gameInfo) as GameId[]).map((id) => {
          const info = gameInfo[id];
          return (
            <article className={`menu-card ${info.color}`} key={id}>
              <span className="card-number">{info.number}</span>
              <span className="card-world-tag">{id === 'snap' ? 'Quick spark' : id === 'missing' ? 'Memory vault' : 'Story portal'}</span>
              <div className="menu-art">
                <span className="character-glow" aria-hidden="true" />
                <img className={`menu-character character-${id}`} src={info.character} alt="" decoding="async" fetchPriority="high" />
              </div>
              <div className="menu-card-copy"><h2>{info.title}</h2><p>{info.subtitle}</p></div>
              <button className="play-button" onClick={() => startGame(id)}>Play <span>▶</span></button>
            </article>
          );
        })}
      </section>
      <footer className="home-footer"><span>Say it loud!</span><i /> <span>Act it out!</span><i /> <span>Have fun!</span></footer>

      {view === 'settings' && (
        <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setView('menu')}>
          <section className="settings-modal" role="dialog" aria-modal="true" aria-labelledby="settings-title">
            <button className="modal-close" onClick={() => setView('menu')} aria-label="Close settings">×</button>
            <p className="eyebrow">Teacher controls</p>
            <h2 id="settings-title">Game settings</h2>
            <label className="setting-row"><span><b>Sound</b><small>Hear each phrase after reveal</small></span><input type="checkbox" checked={settings.sound} onChange={(event) => setSettings({ ...settings, sound: event.target.checked })} /></label>
            <fieldset><legend>Round length</legend><div className="segmented">{([5, 10, 15] as const).map((rounds) => <button className={settings.rounds === rounds ? 'active' : ''} key={rounds} onClick={() => setSettings({ ...settings, rounds })}>{rounds}</button>)}</div></fieldset>
            <label className="setting-row"><span><b>Team mode</b><small>Team Banana vs Team Coconut</small></span><input type="checkbox" checked={settings.teamMode} onChange={(event) => setSettings({ ...settings, teamMode: event.target.checked })} /></label>
            <label className="setting-row"><span><b>Hard mode</b><small>Add “What changed?” rounds</small></span><input type="checkbox" checked={settings.hardMode} onChange={(event) => setSettings({ ...settings, hardMode: event.target.checked })} /></label>
            <button className="primary-button" onClick={() => setView('menu')}>Done</button>
          </section>
        </div>
      )}
    </main>
  );
}
