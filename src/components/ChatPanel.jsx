import React, { useCallback, useEffect, useRef, useState } from 'react';

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
  const p = prompt.trim();
  if (!p) return "I'm here! Ask me anything or try the actions to see me move.";

  const lc = p.toLowerCase();
  if (/(hi|hello|hey|yo)\b/.test(lc)) return "Hey! I'm Nova, your robot friend. Want me to walk, jump, or dance?";
  if (/dance|groove|music/.test(lc)) return "Music mode on! I can dance. Type 'dance' or press the Dance button.";
  if (/jump|hop/.test(lc)) return "Jumping is my cardio. Say 'jump' and watch me bounce!";
  if (/walk|stroll|run/.test(lc)) return "Let's take a stroll. Say 'walk' and I'll get moving.";
  if (/wave|hello/.test(lc)) return "Waving at you! Say 'wave' for a friendly hello.";
  if (/joke|funny/.test(lc)) return "Knock, knock. Who’s there? AI. AI who? AI love hanging out with you.";
  if (/name|who are you/.test(lc)) return "I'm Nova, a friendly robot companion living in your screen.";
  if (/help|what can you do/.test(lc)) return "I chat, speak, and move on command. Try: walk, jump, dance, or wave.";

  return `Got it! ${p} — sounds interesting. I can chat about it, or we can move: walk, jump, dance, or wave.`;
}

function extractEmote(text) {
  const t = text.toLowerCase();
  if (/\bdance\b/.test(t)) return 'dance';
  if (/\bjump|hop\b/.test(t)) return 'jump';
  if (/\bwalk|stroll|run\b/.test(t)) return 'walk';
  if (/\bwave|hello\b/.test(t)) return 'wave';
  return null;
}

export default function ChatPanel({ onAssistantSpeaking, onEmote }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm Nova — your robot friend. Ask me anything, or tell me to walk, jump, dance, or wave." },
  ]);
  const [input, setInput] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    onAssistantSpeaking?.(speaking);
  }, [speaking, onAssistantSpeaking]);

  useEffect(() => {
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

    const wantedEmote = extractEmote(text);
    if (wantedEmote && onEmote) {
      onEmote(wantedEmote);
    }

    const reply = await new Promise((resolve) => {
      setTimeout(() => resolve(localFriendBrain(text)), 300);
    });

    const finalList = [...newList, { role: 'assistant', content: reply }];
    setMessages(finalList);

    speak(reply, {
      onStart: () => setSpeaking(true),
      onEnd: () => setSpeaking(false),
    });
  }, [input, messages, onEmote]);

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
        <p className="text-sm text-zinc-500">Talk to Nova — a friendly robot that can move on command.</p>
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
