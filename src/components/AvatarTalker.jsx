import React, { useMemo } from 'react';

// A stylized human avatar with animated face reacting to speech and emotion
export default function AvatarTalker({ speaking = false, emotion = 'neutral', persona = 'Chitti' }) {
  // Visual theme by persona
  const theme = useMemo(() => {
    if (persona === 'Vikki') {
      return {
        hair: 'bg-zinc-900',
        skin: 'bg-amber-200',
        shirt: 'bg-indigo-600',
        accent: 'bg-pink-500',
      };
    }
    // Chitti theme
    return {
      hair: 'bg-zinc-800',
      skin: 'bg-amber-300',
      shirt: 'bg-cyan-600',
      accent: 'bg-emerald-500',
    };
  }, [persona]);

  const mouthAnim = speaking ? 'animate-[talk_400ms_ease-in-out_infinite]' : '';
  const eyeBlink = 'animate-[blink_5s_ease-in-out_infinite] origin-center';

  const browTilt = {
    neutral: 'translate-y-0 rotate-0',
    happy: '-translate-y-[2px] -rotate-[6deg]',
    sad: 'translate-y-[2px] rotate-[6deg]',
    excited: '-translate-y-[3px] -rotate-[10deg]',
    thinking: 'translate-y-[1px] rotate-[4deg]',
    surprised: '-translate-y-[6px] -rotate-[2deg]',
  }[emotion] || 'translate-y-0 rotate-0';

  const mouthShape = {
    neutral: 'h-1 w-8 rounded-full',
    happy: 'h-2 w-9 rounded-full',
    sad: 'h-1 w-7 rounded-full',
    excited: 'h-3 w-10 rounded-full',
    thinking: 'h-1.5 w-7 rounded-full',
    surprised: 'h-4 w-5 rounded-full',
  }[emotion] || 'h-1 w-8 rounded-full';

  const statusText = speaking ? 'Speaking…' : emotion[0]?.toUpperCase() + emotion.slice(1);

  return (
    <div className="pointer-events-none select-none flex flex-col items-center gap-4">
      {/* Bust card */}
      <div className="relative w-[360px] max-w-full aspect-[4/5] rounded-3xl border border-zinc-200 bg-white/80 backdrop-blur shadow-xl p-6">
        {/* Shoulders / torso */}
        <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-[86%] h-28 ${theme.shirt} rounded-[24px]`} />
        <div className="absolute bottom-[84px] left-1/2 -translate-x-1/2 w-[86%] h-3 bg-white/60 rounded-full" />

        {/* Neck */}
        <div className={`absolute bottom-[116px] left-1/2 -translate-x-1/2 w-16 h-10 ${theme.skin} rounded-b-2xl`} />

        {/* Head */}
        <div className={`absolute bottom-[150px] left-1/2 -translate-x-1/2 w-44 h-44 ${theme.skin} rounded-[56px] border border-amber-300/40`}>
          {/* Ears */}
          <div className={`absolute -left-4 top-1/2 -translate-y-1/2 w-6 h-8 ${theme.skin} rounded-full border border-amber-300/50`} />
          <div className={`absolute -right-4 top-1/2 -translate-y-1/2 w-6 h-8 ${theme.skin} rounded-full border border-amber-300/50`} />

          {/* Hair cap */}
          <div className={`absolute -top-1 left-1/2 -translate-x-1/2 w-48 h-24 ${theme.hair} rounded-[48px]`} />
          {/* Hair fringe */}
          <div className={`absolute top-6 left-6 w-10 h-10 ${theme.hair} rounded-br-[20px] rounded-tl-[20px]`} />
          <div className={`absolute top-6 right-6 w-10 h-10 ${theme.hair} rounded-bl-[20px] rounded-tr-[20px]`} />

          {/* Brows */}
          <div className={`absolute top-[62px] left-[40px] w-10 h-1.5 bg-zinc-800 rounded ${browTilt}`} />
          <div className={`absolute top-[62px] right-[40px] w-10 h-1.5 bg-zinc-800 rounded -scale-x-100 ${browTilt}`} />

          {/* Eyes */}
          <div className="absolute top-[78px] left-[46px] flex gap-16 items-center">
            <div className="relative">
              <div className={`w-6 h-6 bg-white rounded-full border border-zinc-300 overflow-hidden ${eyeBlink}`}>
                <div className="w-3 h-3 bg-zinc-900 rounded-full mt-1.5 ml-1.5" />
              </div>
            </div>
            <div className="relative">
              <div className={`w-6 h-6 bg-white rounded-full border border-zinc-300 overflow-hidden ${eyeBlink}`}>
                <div className="w-3 h-3 bg-zinc-900 rounded-full mt-1.5 ml-1.5" />
              </div>
            </div>
          </div>

          {/* Nose */}
          <div className="absolute top-[106px] left-1/2 -translate-x-1/2 w-3 h-6 bg-amber-300 rounded-full" />

          {/* Mouth */}
          <div className={`absolute top-[130px] left-1/2 -translate-x-1/2 bg-zinc-900 ${mouthShape} ${mouthAnim}`} />
        </div>

        {/* Status chip */}
        <div className="absolute top-4 left-4 flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${speaking ? 'bg-emerald-500' : 'bg-zinc-400'} ${speaking ? 'animate-pulse' : ''}`} />
          <span className="text-xs text-zinc-700 bg-white/70 backdrop-blur rounded-full px-2 py-1 border border-zinc-200">{statusText}</span>
        </div>

        {/* Subtle waveform while speaking */}
        <div className="absolute top-4 right-4 hidden md:flex items-end gap-[3px] h-6">
          {new Array(10).fill(0).map((_, i) => (
            <span key={i} className={`w-[3px] rounded-sm ${speaking ? theme.accent : 'bg-zinc-300'} ${speaking ? 'animate-[wavebar_0.8s_ease-in-out_infinite]' : ''}`} style={{ height: speaking ? `${6 + ((i * 7) % 18)}px` : 6, animationDelay: `${i * 60}ms` }} />
          ))}
        </div>
      </div>

      <p className="text-sm text-zinc-600">Say something in chat — {persona} will answer with voice and expressions.</p>
    </div>
  );
}
