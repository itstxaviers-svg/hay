import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Scores, Settings } from '../types';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import RoundHeader from './RoundHeader';
import ScoreBoard from './ScoreBoard';

interface Props {
  title: string;
  round: number;
  streak: number;
  settings: Settings;
  scores: Scores;
  onScoresChange: (scores: Scores) => void;
  onHome: () => void;
  children: ReactNode;
}

export default function GameLayout({ title, round, streak, settings, scores, onScoresChange, onHome, children }: Props) {
  const [history, setHistory] = useState<(keyof Scores)[]>([]);

  useEffect(() => setHistory([]), [title]);

  const point = (team: keyof Scores) => {
    onScoresChange({ ...scores, [team]: scores[team] + 1 });
    setHistory((items) => [...items, team]);
  };
  const undo = () => {
    const team = history.at(-1);
    if (!team) return;
    onScoresChange({ ...scores, [team]: Math.max(0, scores[team] - 1) });
    setHistory((items) => items.slice(0, -1));
  };

  useKeyboardControls({ Digit1: () => settings.teamMode && point('banana'), Digit2: () => settings.teamMode && point('coconut'), Escape: onHome });

  return (
    <main className="game-screen">
      <RoundHeader title={title} round={round} total={settings.rounds} streak={settings.teamMode ? undefined : streak} onHome={onHome} />
      {settings.teamMode && <ScoreBoard scores={scores} onPoint={point} onUndo={undo} />}
      {children}
    </main>
  );
}
