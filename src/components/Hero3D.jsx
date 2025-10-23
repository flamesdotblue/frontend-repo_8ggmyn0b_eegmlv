import React from 'react';
import Spline from '@splinetool/react-spline';

// Ambient 3D background. Keep overlays pointer-events-none so scene remains interactive.
export default function Hero3D() {
  return (
    <section
      className="relative h-[60vh] lg:h-screen w-full overflow-hidden bg-gradient-to-b from-white to-zinc-100"
      aria-label="Interactive 3D scene"
    >
      <Spline
        scene="https://prod.spline.design/M4yE7MTeWshitQbr/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Readability gradient. Does not block pointer input. */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/40" />
    </section>
  );
}
