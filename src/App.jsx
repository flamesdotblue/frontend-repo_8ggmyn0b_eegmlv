import React, { useCallback, useState } from 'react';
import Hero3D from './components/Hero3D';
import ChatPanel from './components/ChatPanel';
import AvatarTalker from './components/AvatarTalker';
import PersonaSwitcher from './components/PersonaSwitcher';

export default function App() {
  const [assistantSpeaking, setAssistantSpeaking] = useState(false);
  const [emotion, setEmotion] = useState('neutral');
  const [persona, setPersona] = useState('Chitti'); // or Vikki

  const handleSpeaking = useCallback((isSpeaking) => {
    setAssistantSpeaking(isSpeaking);
  }, []);

  const handleEmotion = useCallback((e) => {
    setEmotion(e || 'neutral');
  }, []);

  return (
    <div className="min-h-screen w-full bg-white text-zinc-900">
      {/* Header */}
      <header className="sticky top-0 z-10 w-full border-b border-zinc-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`${assistantSpeaking ? 'bg-green-500 animate-pulse' : 'bg-zinc-400'} h-2.5 w-2.5 rounded-full`} />
            <h1 className="text-base md:text-lg font-semibold">{persona} — Your Virtual Friend</h1>
          </div>
          <PersonaSwitcher value={persona} onChange={setPersona} />
        </div>
      </header>

      {/* Hero + Chat layout */}
      <main className="mx-auto max-w-7xl px-4 pt-4 pb-10">
        <div className="grid lg:grid-cols-2 gap-6 items-stretch">
          {/* 3D background with human avatar overlay */}
          <div className="relative rounded-3xl overflow-hidden border border-zinc-200 shadow-sm">
            <Hero3D />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-6">
              <AvatarTalker speaking={assistantSpeaking} emotion={emotion} persona={persona} />
            </div>
          </div>

          {/* Chat only (no action buttons) */}
          <div className="flex flex-col gap-4">
            <ChatPanel persona={persona} onAssistantSpeaking={handleSpeaking} onEmotion={handleEmotion} />
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
              <p className="text-sm text-zinc-600">Type naturally. Replies are shown as text and spoken aloud with tone and subtle expressions.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Keyframes & avatar micro-animations */}
      <style>{`
        @keyframes wavebar { 0%,100%{ transform: scaleY(0.6);} 50%{ transform: scaleY(1.4);} }
        @keyframes blink { 0%, 92%, 100% { transform: scaleY(1); } 96% { transform: scaleY(0.05); } }
        @keyframes talk { 0%,100% { transform: scaleY(0.2);} 50% { transform: scaleY(1);} }
      `}</style>
    </div>
  );
}
