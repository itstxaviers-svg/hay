import { useEffect, useState } from 'react';
import Celebration from '../components/Celebration';
import EmotionCard from '../components/EmotionCard';
import type { EmotionId } from '../data/emotions';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { useRoundDeck } from '../hooks/useRoundDeck';
import { speakPhrase } from '../utils/speech';
import type { GameProps } from '../types';

const situations: Record<EmotionId, { icons: string[]; hint: string }> = {
  hungry: { icons: ['🍽️', '💭', '🍌'], hint: 'The plate is empty. Where is the banana?' },
  tired: { icons: ['📚', '🌙', '🛏️'], hint: 'It is late after a long school day.' },
  cold: { icons: ['❄️', '🌡️', '🧣'], hint: 'Snow is falling. The temperature is low.' },
  sad: { icons: ['🧸', '💔', '🌧️'], hint: 'A favourite toy is broken.' },
  happy: { icons: ['🎁', '☀️', '🎈'], hint: 'A surprise present and a sunny day!' },
  great: { icons: ['🏆', '🎆', '⭐'], hint: 'First place — what a brilliant result!' },
  good: { icons: ['📚', '✅', '👍'], hint: 'The homework is finished.' },
  ok: { icons: ['🌤️', '🪑', '🫖'], hint: 'A quiet, calm afternoon.' },
};

export default function MonkeyRescue({ settings, onFinish, onProgress }: GameProps) {
  const { draw } = useRoundDeck();
  const [emotion, setEmotion] = useState(() => draw());
  const [round, setRound] = useState(1);
  const [revealed, setRevealed] = useState(false);
  const [intro, setIntro] = useState(true);
  const situation = situations[emotion.id];

  useEffect(() => onProgress(round, revealed ? round : round - 1), [onProgress, revealed, round]);

  const reveal = () => {
    if (intro || revealed) return;
    setRevealed(true);
    speakPhrase(emotion.phrase, settings.sound);
  };
  const next = () => {
    if (intro) { setIntro(false); return; }
    if (round >= settings.rounds) { onFinish(round); return; }
    setEmotion(draw());
    setRound((value) => value + 1);
    setRevealed(false);
  };
  useKeyboardControls({ Space: intro ? () => setIntro(false) : revealed ? next : reveal, KeyR: reveal, KeyN: next });

  if (intro) {
    return (
      <section className="game-stage rescue-intro">
        <div className="rescue-badge">🍌</div>
        <h1>HELP THE MONKEY!</h1>
        <p>Look at the situation. Guess how the monkey feels.</p>
        <button className="primary-button coral" onClick={() => setIntro(false)}>Let's go! <kbd>Space</kbd></button>
      </section>
    );
  }

  return (
    <section className={`game-stage rescue-stage scene-${emotion.id}`}>
      <h1 className="rescue-prompt">{revealed ? 'YES! THE MONKEY SAYS…' : 'HOW DOES THE MONKEY FEEL?'}</h1>
      <div className={`situation-card situation-${emotion.id}${revealed ? ' compact' : ''}`}>
        <div className="situation-icons" aria-label={situation.hint}>
          {situation.icons.map((icon, index) => <span key={`${icon}-${index}`}>{icon}</span>)}
        </div>
        <p>{situation.hint}</p>
      </div>
      {!revealed && <div className="thinking-dots" aria-hidden="true"><i /><i /><i /></div>}
      {revealed && (
        <div className="rescue-reveal" aria-live="polite">
          <EmotionCard emotion={emotion} selected />
          <h2 className="rescue-answer-text">{emotion.phrase}</h2>
          <div className="rescue-reward"><span className="flying-banana">🍌</span><Celebration compact /></div>
        </div>
      )}
      <div className="game-actions">
        {!revealed ? <button className="primary-button" onClick={reveal}>Show emotion <kbd>Space</kbd></button> : <button className="primary-button coral" onClick={next}>Next <kbd>N</kbd></button>}
      </div>
    </section>
  );
}
