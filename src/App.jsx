import React, { useCallback, useState } from 'react';
import Hero3D from './components/Hero3D';
import ChatPanel from './components/ChatPanel';
import ActionsBar from './components/ActionsBar';
import AvatarTalker from './components/AvatarTalker';

export default function App() {
  const [emote, setEmote] = useState(null);
  const [assistantSpeaking, setAssistantSpeaking] = useState(false);

  const handleEmote = useCallback((name) => {
    setEmote(name);
    if (!name) return;
    // Clear the emote after a short duration
    window.clearTimeout(window.__emoteTimer);
    window.__emoteTimer = window.setTimeout(() => setEmote(null), 1500);
  }, []);

  return (
    <div className="min-h-screen w-full bg-white text-zinc-900">
      {/* Header */}
      <header className="sticky top-0 z-10 w-full border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`${assistantSpeaking ? 'bg-green-500 animate-pulse' : 'bg-zinc-400'} h-2.5 w-2.5 rounded-full`} />
            <h1 className="text-base md:text-lg font-semibold">Nova — Your 3D Robot Friend</h1>
          </div>
          <div className="hidden md:block text-sm text-zinc-500">Follows your cursor • Speaks responses</div>
        </div>
      </header>

      {/* Hero + Chat layout */}
      <main className="mx-auto max-w-7xl px-4 pt-4 pb-10">
        <div className="grid lg:grid-cols-2 gap-6 items-stretch">
          <div className="relative rounded-3xl overflow-hidden border border-zinc-200 shadow-sm">
            <Hero3D overlayEmote={emote} />
            <AvatarTalker speaking={assistantSpeaking} />
          </div>

          <div className="flex flex-col gap-4">
            <ChatPanel onAssistantSpeaking={setAssistantSpeaking} onEmote={handleEmote} />
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium">Actions</h3>
                <span className="text-xs text-zinc-500">Walk, jump, dance, wave</span>
              </div>
              <ActionsBar onEmote={handleEmote} />
              <p className="mt-3 text-xs text-zinc-500">Tip: The 3D robot follows your cursor. Try moving your mouse around!</p>
            </div>
          </div>
        </div>
      </main>

      {/* Keyframes for custom subtle animations */}
      <style>{`
        @keyframes wiggle {
          0%, 100% { transform: translateX(0px); }
          50% { transform: translateX(14px); }
        }
        @keyframes wave {
          0% { transform: rotate(0deg) translateY(0px); }
          50% { transform: rotate(12deg) translateY(-4px); }
          100% { transform: rotate(0deg) translateY(0px); }
        }
        @keyframes wavebar {
          0%, 100% { transform: scaleY(0.6); }
          50% { transform: scaleY(1.4); }
        }
      `}</style>
    </div>
  );
}
