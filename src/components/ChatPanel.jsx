import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

function speak(text, { onStart, onEnd } = {}) {
  try {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    utter.rate = 1.02;
    utter.pitch = 1.05;
    utter.onstart = () => onStart && onStart();
    utter.onend = () => onEnd && onEnd();
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  } catch (e) {
    onStart && onStart();
    onEnd && onEnd();
  }
}

function localFriendBrain(prompt) {
  // Lightweight, deterministic pseudo-AI to keep the UI functional without backend
  const p = prompt.trim();
  if (!p) return "I'm here! Ask me anything or try the actions to see me move.";

  const lc = p.toLowerCase();
  if (/(hi|hello|hey|yo)\b/.test(lc)) return "Hey! I'm your virtual buddy. Want to walk, jump, or dance together?";
  if (/dance|groove|music/.test(lc)) return "Cue the music! I can dance. Hit the Dance button and let's vibe.";
  if (/jump|hop/.test(lc)) return "Jumping is my cardio. Tap Jump and watch me bounce!";
  if (/walk|stroll|run/.test(lc)) return "Let’s take a stroll. Press Walk and I’ll get moving.";
  if (/wave|hello/.test(lc)) return "Waving at you! Give the Wave button a try for a friendly hello.";
  if (/joke|funny/.test(lc)) return "Knock, knock. Who’s there? AI. AI who? AI love hanging out with you.";
  if (/name|who are you/.test(lc)) return "I'm Nova, your friendly robot companion. I watch, I chat, and I dance.";
  if (/help|what can you do/.test(lc)) return "I chat, speak out loud, and mirror vibes with motion. Ask me things or pick an action!";

  // Generic empathetic response
  return `Got it! ${p} — sounds interesting. I can chat about it, or we can move: walk, jump, dance, or wave.`;
}

export default function ChatPanel({ onAssistantSpeaking }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm Nova — your virtual friend. I can track your cursor, chat, and move. Try saying hi or press an action." },
  ]);
  const [input, setInput] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    onAssistantSpeaking?.(speaking);
  }, [speaking, onAssistantSpeaking]);

  useEffect(() => {
    // Auto-scroll to the bottom when new messages arrive
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages.length]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text) return;
    const newList = [...messages, { role: 'user', content: text }];
    setMessages(newList);
    setInput('');

    // Simulate typing delay and generate local reply
    const reply = await new Promise((resolve) => {
      setTimeout(() => resolve(localFriendBrain(text)), 350);
    });

    const finalList = [...newList, { role: 'assistant', content: reply }];
    setMessages(finalList);

    speak(reply, {
      onStart: () => setSpeaking(true),
      onEnd: () => setSpeaking(false),
    });
  }, [input, messages]);

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-full flex-col rounded-2xl border border-zinc-200 bg-white/80 backdrop-blur shadow-sm">
      <div className="px-5 py-4 border-b border-zinc-200">
        <h2 className="text-lg font-semibold text-zinc-900">Chat</h2>
        <p className="text-sm text-zinc-500">Talk to Nova — I also speak out loud.</p>
      </div>

      <div ref={listRef} className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {messages.map((m, i) => (
          <Message key={i} role={m.role} content={m.content} />
        ))}
      </div>

      <div className="p-3 border-t border-zinc-200">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            rows={1}
            placeholder="Say hi or ask me to dance…"
            className="flex-1 resize-none rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-zinc-500 shadow-sm"
          />
          <button
            onClick={sendMessage}
            className="rounded-xl bg-black text-white px-4 py-2 text-sm font-medium shadow hover:bg-zinc-800 active:scale-[0.98] transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

function Message({ role, content }) {
  const isUser = role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`${
          isUser
            ? 'bg-zinc-900 text-white'
            : 'bg-zinc-100 text-zinc-900'
        } max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow`}
      >
        {content}
      </div>
    </div>
  );
}
