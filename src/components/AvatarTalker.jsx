import React, { useMemo } from 'react';

// Stylized human avatar tuned to the provided facial analysis
// Features: oval/heart face, warm skin tone, dark wavy hair, almond eyes with slight tilt,
// arched thick brows, straight medium-width nose, medium lips with gentle smile.
export default function AvatarTalker({ speaking = false, emotion = 'neutral', persona = 'Chitti' }) {
  const theme = useMemo(() => {
    // Subtle variation by persona
    if (persona === 'Vikki') {
      return {
        hair: 'bg-zinc-900',
        skin: 'bg-amber-200', // warm light-medium
        skinMid: 'bg-amber-300',
        lip: 'bg-rose-400',
        shirt: 'bg-indigo-600',
        accent: 'bg-pink-500',
      };
    }
    return {
      hair: 'bg-zinc-800',
      skin: 'bg-amber-300',
      skinMid: 'bg-amber-400',
      lip: 'bg-rose-500',
      shirt: 'bg-cyan-600',
      accent: 'bg-emerald-500',
    };
  }, [persona]);

  const mouthAnim = speaking ? 'animate-[talk_400ms_ease-in-out_infinite]' : '';
  const eyeBlink = 'animate-[blink_5s_ease-in-out_infinite] origin-center';

  // Expressions
  const browTilt = {
    neutral: 'translate-y-0 rotate-0',
    happy: '-translate-y-[2px] -rotate-[6deg]',
    sad: 'translate-y-[2px] rotate-[6deg]',
    excited: '-translate-y-[3px] -rotate-[10deg]',
    thinking: 'translate-y-[1px] rotate-[4deg]',
    surprised: '-translate-y-[6px] -rotate-[2deg]',
  }[emotion] || 'translate-y-0 rotate-0';

  const mouthShape = {
    neutral: 'h-1.5 w-8 rounded-full',
    happy: 'h-2 w-10 rounded-full',
    sad: 'h-1 w-7 rounded-full',
    excited: 'h-3 w-11 rounded-full',
    thinking: 'h-1.5 w-7 rounded-full',
    surprised: 'h-4 w-5 rounded-full',
  }[emotion] || 'h-1.5 w-8 rounded-full';

  const statusText = speaking ? 'Speaking…' : emotion[0]?.toUpperCase() + emotion.slice(1);

  return (
    <div className="pointer-events-none select-none flex flex-col items-center gap-4">
      {/* Bust card */}
      <div className="relative w-[360px] max-w-full aspect-[4/5] rounded-3xl border border-zinc-200 bg-white/85 backdrop-blur shadow-xl p-6">
        {/* Shoulders / torso */}
        <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-[86%] h-28 ${theme.shirt} rounded-[24px]`} />
        <div className="absolute bottom-[84px] left-1/2 -translate-x-1/2 w-[86%] h-3 bg-white/60 rounded-full" />

        {/* Neck */}
        <div className={`absolute bottom-[116px] left-1/2 -translate-x-1/2 w-16 h-10 ${theme.skin} rounded-b-2xl`} />

        {/* Head: oval-to-heart shape with defined cheekbones */}
        <div className={`absolute bottom-[150px] left-1/2 -translate-x-1/2 w-44 h-46 ${theme.skin} rounded-[56px] border border-amber-300/40`} style={{ borderTopLeftRadius: 56, borderTopRightRadius: 56, borderBottomLeftRadius: 52, borderBottomRightRadius: 52 }}>
          {/* Ears */}
          <div className={`absolute -left-4 top-1/2 -translate-y-1/2 w-6 h-8 ${theme.skin} rounded-full border border-amber-300/50`} />
          <div className={`absolute -right-4 top-1/2 -translate-y-1/2 w-6 h-8 ${theme.skin} rounded-full border border-amber-300/50`} />

          {/* Hair cap with wavy fringe */}
          <div className={`absolute -top-2 left-1/2 -translate-x-1/2 w-48 h-26 ${theme.hair} rounded-[50px]`} />
          <div className={`absolute top-5 left-5 w-12 h-10 ${theme.hair} rounded-br-[22px] rounded-tl-[18px]`} />
          <div className={`absolute top-6 left-16 w-10 h-8 ${theme.hair} rounded-br-[18px] rounded-tl-[16px]`} />
          <div className={`absolute top-5 right-6 w-12 h-10 ${theme.hair} rounded-bl-[22px] rounded-tr-[18px]`} />

          {/* Brows: thick, defined, slight arch */}
          <div className={`absolute top-[62px] left-[36px] w-12 h-1.5 bg-zinc-900 rounded ${browTilt}`} />
          <div className={`absolute top-[62px] right-[36px] w-12 h-1.5 bg-zinc-900 rounded -scale-x-100 ${browTilt}`} />

          {/* Eyes: almond-shaped, slight upward tilt, dark brown irises */}
          <div className="absolute top-[80px] left-[40px] flex gap-16 items-center">
            <div className="relative -rotate-[6deg]">
              <div className={`w-7 h-5 bg-white rounded-[16px] border border-zinc-300 overflow-hidden ${eyeBlink}`} style={{ transformOrigin: '50% 50%' }}>
                <div className="w-3.5 h-3.5 bg-zinc-900 rounded-full mt-1 ml-2" />
              </div>
            </div>
            <div className="relative rotate-[6deg]">
              <div className={`w-7 h-5 bg-white rounded-[16px] border border-zinc-300 overflow-hidden ${eyeBlink}`} style={{ transformOrigin: '50% 50%' }}>
                <div className="w-3.5 h-3.5 bg-zinc-900 rounded-full mt-1 ml-1.5" />
              </div>
            </div>
          </div>

          {/* Nose: straight bridge, medium width */}
          <div className="absolute top-[108px] left-1/2 -translate-x-1/2 w-3.5 h-8 rounded-full" style={{ background: 'linear-gradient(180deg, rgba(251, 191, 36, 0.6), rgba(245, 158, 11, 0.7))' }} />

          {/* Lips: medium fullness, natural pink tone with gentle smile */}
          <div className={`absolute top-[134px] left-1/2 -translate-x-1/2 ${theme.lip} ${mouthShape} ${mouthAnim}`} />
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
