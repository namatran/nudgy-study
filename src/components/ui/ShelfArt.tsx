// Flat "sketch" tiles for shelf items: simple shapes on a tinted block, drawn for this study.
export function ShelfArt({ art }: { art: string }) {
  if (art === "lamp") {
    return (
      <svg viewBox="0 0 100 125" aria-hidden="true">
        <path d="M30 108h40" stroke="#6b5a3a" strokeWidth="6" strokeLinecap="round" />
        <path d="M50 106 38 64l26-22" fill="none" stroke="#b8913f" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M54 30l30 10-12 22-26-14z" fill="#c9a24c" />
        <circle cx="38" cy="64" r="4" fill="#8a6a2c" />
        <path d="M74 62l8 14" stroke="#f3d27a" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
      </svg>
    );
  }
  if (art === "lamps") {
    return (
      <svg viewBox="0 0 100 75" aria-hidden="true">
        {[22, 50, 78].map((x, i) => (
          <g key={x}>
            <path d={`M${x} 66V36`} stroke="#6b6b6b" strokeWidth="2.5" />
            <path d={`M${x - 12} 36h24l-6-16h-12z`} fill={["#7d8c62", "#b39056", "#5a6f8f"][i]} />
            <path d={`M${x - 8} 66h16`} stroke="#6b6b6b" strokeWidth="3" strokeLinecap="round" />
          </g>
        ))}
      </svg>
    );
  }
  if (art === "swatch") {
    const rows = ["#e8d9c5", "#d7c2a6", "#f2e1a8", "#c7d6c1", "#b7c8d8"];
    return (
      <svg viewBox="0 0 100 75" aria-hidden="true">
        {rows.map((c, i) => (
          <g key={c}>
            <rect x="14" y={8 + i * 12} width="72" height="9" rx="2" fill={c} />
            <rect x="18" y={11 + i * 12} width="20" height="3" rx="1.5" fill="rgb(0 0 0 / 0.18)" />
          </g>
        ))}
      </svg>
    );
  }
  // pasta
  return (
    <svg viewBox="0 0 100 75" aria-hidden="true">
      <ellipse cx="50" cy="40" rx="34" ry="12" fill="#f7e2a5" />
      <path d="M22 40c4 12 52 12 56 0" fill="#f0d382" />
      <path d="M16 40c0 18 68 18 68 0" fill="#3f5a7a" />
      <circle cx="40" cy="36" r="4" fill="#fff4c9" stroke="#e7c35e" strokeWidth="2" />
      <path d="M54 34h12M52 39h14" stroke="#5f8f4e" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
