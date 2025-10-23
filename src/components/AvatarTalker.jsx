import React, { useEffect, useMemo, useRef } from 'react';

export default function AvatarTalker({ speaking, text }) {
  // A simple floating status light that pulses when speaking
  const pulseClass = speaking ? 'animate-pulse' : '';

  // Generate subtle waveform bars while speaking
  const bars = useMemo(() => new Array(12).fill(0), []);

  return (
    <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-3">
      <div className={`h-3 w-3 rounded-full ${speaking ? 'bg-green-500' : 'bg-zinc-400'} ${pulseClass}`} />
      <div className="hidden md:flex items-end gap-[3px] h-6">
        {bars.map((_, idx) => (
          <span
            key={idx}
            className={`w-[3px] rounded-sm bg-zinc-700 transition-all duration-200 ${speaking ? 'animate-[wavebar_0.8s_ease-in-out_infinite]' : 'h-[6px]'}`}
            style={{ height: speaking ? `${6 + ((idx * 7) % 18)}px` : undefined, animationDelay: `${idx * 60}ms` }}
          />
        ))}
      </div>
      <span className="hidden md:inline text-xs text-zinc-600 bg-white/70 backdrop-blur rounded-full px-2 py-1 border border-zinc-200">
        {speaking ? 'Speaking…' : 'Idle'}
      </span>
    </div>
  );
}
