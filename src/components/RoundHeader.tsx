interface Props {
  title: string;
  round: number;
  total: number;
  streak?: number;
  onHome: () => void;
}

export default function RoundHeader({ title, round, total, streak, onHome }: Props) {
  return (
    <header className="round-header">
      <button className="icon-button" onClick={onHome} aria-label="Back to main menu">←</button>
      <div className="game-name"><span className="mini-banana">●</span>{title}</div>
      <div className="round-progress">
        {streak !== undefined && <span className="streak">⭐ {streak}</span>}
        <strong>{Math.min(round, total)} / {total}</strong>
      </div>
    </header>
  );
}
