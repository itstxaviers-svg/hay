import { useCallback, useEffect, useState } from 'react';
import EmotionCard from '../components/EmotionCard';
import Celebration from '../components/Celebration';
import { emotions, type Emotion } from '../data/emotions';
import { useRoundDeck } from '../hooks/useRoundDeck';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { sample, shuffle } from '../utils/shuffle';
import { speakPhrase } from '../utils/speech';
import type { GameProps } from '../types';

type Phase = 'look' | 'curtain' | 'guess' | 'revealed';
interface MissingRound { cards: Emotion[]; answer: Emotion; slot: number; changed: boolean; replacement?: Emotion }

export default function WhatsMissing({ settings, onFinish, onProgress }: GameProps) {
  const { draw } = useRoundDeck();
  const makeRound = useCallback((roundNumber: number): MissingRound => {
    const count = roundNumber <= 3 ? 3 : roundNumber <= 7 ? 4 : 5;
    const answer = draw();
    const changed = settings.hardMode && roundNumber > 2 && Math.random() < 0.38;
    const others = sample(emotions.filter((item) => item.id !== answer.id), count - 1);
    const cards = shuffle([answer, ...others]);
    const slot = cards.findIndex((item) => item.id === answer.id);
    if (!changed) return { cards, answer, slot, changed };
    const replacement = sample(emotions.filter((item) => !cards.some((card) => card.id === item.id)), 1)[0] ?? others[0];
    return { cards, answer: replacement, slot, changed, replacement };
  }, [draw, settings.hardMode]);

  const [round, setRound] = useState(1);
  const [phase, setPhase] = useState<Phase>('look');
  const [current, setCurrent] = useState(() => makeRound(1));

  useEffect(() => onProgress(round, phase === 'revealed' ? round : round - 1), [onProgress, phase, round]);

  useEffect(() => {
    if (phase !== 'look') return;
    const timer = window.setTimeout(() => setPhase('curtain'), 4000);
    return () => window.clearTimeout(timer);
  }, [phase, round]);
  useEffect(() => {
    if (phase !== 'curtain') return;
    const timer = window.setTimeout(() => setPhase('guess'), 600);
    return () => window.clearTimeout(timer);
  }, [phase]);

  const advanceToGuess = () => setPhase((value) => value === 'look' ? 'curtain' : value);
  const reveal = () => {
    if (phase !== 'guess') return;
    setPhase('revealed');
    speakPhrase(current.answer.phrase, settings.sound, current.answer.audio);
  };
  const next = () => {
    if (round >= settings.rounds) {
      onFinish(round);
      return;
    }
    const nextRound = round + 1;
    setRound(nextRound);
    setCurrent(makeRound(nextRound));
    setPhase('look');
  };
  const spaceAction = phase === 'look' ? advanceToGuess : phase === 'guess' ? reveal : phase === 'revealed' ? next : undefined;
  useKeyboardControls({ Space: spaceAction, KeyR: reveal, KeyN: next });

  const shownCards = current.cards.map((card, index) => {
    if (index !== current.slot) return card;
    if (current.changed && phase !== 'look' && phase !== 'curtain') return current.replacement!;
    return card;
  });
  const gridClass = `memory-grid count-${current.cards.length}`;

  return (
    <section className="game-stage missing-stage">
      <div className="memory-heading">
        <h1>{phase === 'look' ? 'LOOK!' : current.changed ? 'WHAT CHANGED?' : "WHAT'S MISSING?"}</h1>
        <p>{phase === 'look' ? 'Remember every monkey.' : 'Point and say the whole sentence!'}</p>
      </div>
      {phase === 'look' && <div className="look-timer" key={round}><i /></div>}
      <div className={gridClass}>
        {shownCards.map((card, index) => {
          const isAnswerSlot = index === current.slot;
          const missing = !current.changed && isAnswerSlot && phase === 'guess';
          const label = isAnswerSlot && phase === 'revealed';
          return <EmotionCard key={`${round}-${index}-${card.id}`} emotion={phase === 'revealed' && isAnswerSlot ? current.answer : card} size="small" hidden={missing} selected={label} />;
        })}
      </div>
      {phase === 'curtain' && <div className="curtain"><span>☁️</span><span>☁️</span><span>☁️</span></div>}
      {phase === 'revealed' && (
        <div className="memory-answer"><Celebration compact /><strong>{current.answer.phrase}</strong></div>
      )}
      <div className="game-actions">
        {phase === 'look' && <button className="secondary-button" onClick={advanceToGuess}>Ready!</button>}
        {phase === 'guess' && <button className="primary-button" onClick={reveal}>Reveal <kbd>Space</kbd></button>}
        {phase === 'revealed' && <button className="primary-button coral" onClick={next}>Next <kbd>N</kbd></button>}
      </div>
    </section>
  );
}
