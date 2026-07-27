export const ProgressRing = ({ value, size = 96, label = 'Score' }) => {
  const radius = size / 2 - 8;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (value / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(148,163,184,0.14)" strokeWidth="8" fill="transparent" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#resume-progress)"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="resume-progress" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute text-center">
        <div className="text-2xl font-semibold text-white">{value}</div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-slate-400">{label}</div>
      </div>
    </div>
  );
};
