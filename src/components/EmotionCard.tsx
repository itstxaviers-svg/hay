import { useState } from 'react';
import type { Emotion } from '../data/emotions';

interface EmotionCardProps {
  emotion: Emotion;
  size?: 'small' | 'large';
  hidden?: boolean;
  selected?: boolean;
  label?: boolean;
}

export default function EmotionCard({ emotion, size = 'large', hidden = false, selected = false, label = false }: EmotionCardProps) {
  const [failed, setFailed] = useState(false);

  if (hidden) {
    return <div className={`emotion-card ${size} empty-card`} aria-label="Missing card"><span>?</span></div>;
  }

  return (
    <div className={`emotion-card ${size}${selected ? ' selected' : ''}`} style={{ '--emotion-accent': emotion.accent } as React.CSSProperties}>
      {!failed ? (
        <img src={emotion.image} alt={`Monkey feeling ${emotion.label.toLowerCase()}`} onError={() => setFailed(true)} draggable={false} />
      ) : (
        <div className={`monkey-fallback monkey-${emotion.id}`} role="img" aria-label={`Monkey feeling ${emotion.label.toLowerCase()}`}>
          <span className="fallback-ear left" />
          <span className="fallback-ear right" />
          <span className="fallback-face"><i className="eye left" /><i className="eye right" /><i className="mouth" /></span>
          <span className="fallback-clue">{emotion.clueIcon}</span>
        </div>
      )}
      {label && <strong className="card-label">{emotion.phrase}</strong>}
    </div>
  );
}
