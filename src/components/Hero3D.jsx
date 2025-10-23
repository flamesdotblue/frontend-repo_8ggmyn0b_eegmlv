import React, { useRef } from 'react';
import Spline from '@splinetool/react-spline';

// 3D hero section hosting the interactive robot scene
export default function Hero3D({ overlayEmote }) {
  const containerRef = useRef(null);

  return (
    <section
      ref={containerRef}
      className="relative h-[60vh] lg:h-screen w-full overflow-hidden bg-gradient-to-b from-white to-zinc-100"
      aria-label="Interactive robot scene"
    >
      <Spline
        scene="https://prod.spline.design/M4yE7MTeWshitQbr/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Soft vignette so UI elements remain readable. Don't block mouse with overlay. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/40" />

      {/* Emote overlay for walk/jump/dance illusions */}
      {overlayEmote && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <Emote type={overlayEmote} />
        </div>
      )}
    </section>
  );
}

function Emote({ type }) {
  const base = 'text-6xl md:text-7xl lg:text-8xl select-none';
  // Simple visual effect to hint at motion over the 3D scene
  if (type === 'jump') {
    return (
      <div className={`${base} animate-bounce`} role="img" aria-label="Robot jumping">🤖</div>
    );
  }
  if (type === 'dance') {
    return (
      <div className={`${base} animate-[spin_1.5s_linear_infinite]`} role="img" aria-label="Robot dancing">🤖</div>
    );
  }
  if (type === 'walk') {
    return (
      <div className={`${base} animate-[wiggle_1s_ease-in-out_infinite]`} role="img" aria-label="Robot walking">🤖</div>
    );
  }
  if (type === 'wave') {
    return (
      <div className={`${base} animate-[wave_1.8s_ease-in-out_infinite]`} role="img" aria-label="Robot waving">🤖</div>
    );
  }
  return null;
}
