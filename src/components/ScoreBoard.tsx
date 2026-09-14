import type { Scores } from '../types';

interface Props {
  scores: Scores;
  onPoint: (team: keyof Scores) => void;
  onUndo: () => void;
}

export default function ScoreBoard({ scores, onPoint, onUndo }: Props) {
  return (
    <div className="score-board" aria-label="Team scores">
      <button className="team-score banana-team" onClick={() => onPoint('banana')} title="Add point (1)">
        <span>🍌 Team Banana</span><b>{scores.banana}</b><kbd>1</kbd>
      </button>
      <button className="score-undo" onClick={onUndo} aria-label="Undo last point" title="Undo last point">↶ Undo</button>
      <button className="team-score coconut-team" onClick={() => onPoint('coconut')} title="Add point (2)">
        <kbd>2</kbd><b>{scores.coconut}</b><span>Team Coconut 🥥</span>
      </button>
    </div>
  );
}
