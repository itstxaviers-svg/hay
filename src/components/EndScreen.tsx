import Celebration from './Celebration';
import type { Scores, Settings } from '../types';

interface Props {
  title: string;
  settings: Settings;
  scores: Scores;
  onAgain: () => void;
  onHome: () => void;
}

export default function EndScreen({ title, settings, scores, onAgain, onHome }: Props) {
  const result = scores.banana === scores.coconut
    ? "It's a tie!"
    : scores.banana > scores.coconut
      ? 'Team Banana wins!'
      : 'Team Coconut wins!';
  return (
    <main className="end-screen">
      <Celebration />
      <div className="end-card">
        <span className="end-emoji">🏆</span>
        <p>{title} complete!</p>
        <h1>{settings.teamMode ? result : 'Brilliant speaking!'}</h1>
        {settings.teamMode && (
          <div className="final-scores">
            <span>🍌 <b>{scores.banana}</b></span>
            <span>🥥 <b>{scores.coconut}</b></span>
          </div>
        )}
        <div className="button-row">
          <button className="primary-button coral" onClick={onAgain}>Play again</button>
          <button className="secondary-button" onClick={onHome}>Main menu</button>
        </div>
      </div>
    </main>
  );
}
