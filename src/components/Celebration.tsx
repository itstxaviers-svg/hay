export default function Celebration({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`celebration${compact ? ' compact' : ''}`} aria-hidden="true">
      {['★', '●', '★', '●', '★', '●', '★'].map((shape, index) => (
        <i key={index} style={{ '--i': index } as React.CSSProperties}>{shape}</i>
      ))}
    </div>
  );
}
