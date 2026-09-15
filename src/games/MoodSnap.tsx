import { useEffect, useMemo, useState } from 'react';
import EmotionCard from '../components/EmotionCard';
import Celebration from '../components/Celebration';
import { useRoundDeck } from '../hooks/useRoundDeck';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { speakPhrase } from '../utils/speech';
import type { GameProps } from '../types';

const badges = ['WHISPER', 'ROBOT', 'SUPER HAPPY', 'VERY SLOW', 'VERY FAST'];

export default function MoodSnap({ settings, onFinish, onProgress }: GameProps) {
  const { draw } = useRoundDeck();
  const [emotion, setEmotion] = useState(() => draw());
  const [round, setRound] = useState(1);
  const [countdown, setCountdown] = useState(3);
  const [revealed, setRevealed] = useState(false);
  const badge = useMemo(() => round > 2 && Math.random() < 0.45 ? badges[Math.floor(Math.random() * badges.length)] : '', [round]);

  useEffect(() => onProgress(round, revealed ? round : round - 1), [onProgress, revealed, round]);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = window.setTimeout(() => setCountdown((value) => value - 1), 620);
    return () => window.clearTimeout(timer);
  }, [countdown]);

  const reveal = () => {
    if (countdown > 0 || revealed) return;
    setRevealed(true);
    speakPhrase(emotion.phrase, settings.sound, emotion.audio);
  };
  const next = () => {
    if (round >= settings.rounds) {
      onFinish(round);
      return;
    }
    setEmotion(draw());
    setRound((value) => value + 1);
    setRevealed(false);
    setCountdown(3);
  };

  useEffect(() => {
    if (!revealed) return;
    const timer = window.setTimeout(next, 1500);
    return () => window.clearTimeout(timer);
    // `next` intentionally uses the current round snapshot.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revealed]);

  useKeyboardControls({ Space: revealed ? next : reveal, KeyR: reveal, KeyN: next });

  return (
    <section className="game-stage mood-stage">
      {countdown > 0 ? (
        <div className="countdown" key={countdown}><span>Get ready!</span><b>{countdown}</b></div>
      ) : (
        <>
          {badge && <span className="challenge-badge">⚡ {badge}</span>}
          <p className="prompt-line">Look, think, say the whole sentence!</p>
          <div className={revealed ? 'hero-card revealed' : 'hero-card'}>
            <EmotionCard emotion={emotion} />
          </div>
          <div className="answer-space" aria-live="polite">
            {revealed ? <h2>{emotion.phrase}</h2> : <span className="sound-waves">)))</span>}
          </div>
          {revealed && <Celebration compact />}
          <div className="game-actions">
            {!revealed ? (
              <button className="primary-button" onClick={reveal}>Reveal <kbd>Space</kbd></button>
            ) : (
              <button className="primary-button coral" onClick={next}>Next <kbd>N</kbd></button>
            )}
          </div>
        </>
      )}
    </section>
  );
}
