import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

function pickVoiceForPersona(persona) {
  const voices = window.speechSynthesis?.getVoices?.() || [];
  const preferFemale = persona === 'Vikki';
  const preferMale = persona === 'Chitti';
  // Try to find an English voice that aligns with persona
  const enVoices = voices.filter(v => /en[-_]/i.test(v.lang) || v.lang === 'en-US' || v.lang === 'en-GB');
  const byGenderHint = enVoices.find(v => preferFemale ? /female|woman|siri|victoria|google uk english female/i.test(v.name) : /male|man|daniel|google us english/i.test(v.name));
  return byGenderHint || enVoices[0] || voices[0] || null;
}

function speak(text, { persona, emotion, onStart, onEnd } = {}) {
  try {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    const voice = pickVoiceForPersona(persona);
    if (voice) utter.voice = voice;

    // Tone shaping by emotion
    switch (emotion) {
      case 'happy':
        utter.pitch = 1.2; utter.rate = 1.04; break;
      case 'sad':
        utter.pitch = 0.9; utter.rate = 0.95; break;
      case 'excited':
        utter.pitch = 1.25; utter.rate = 1.12; break;
      case 'thinking':
        utter.pitch = 1.0; utter.rate = 0.98; break;
      case 'surprised':
        utter.pitch = 1.3; utter.rate = 1.05; break;
      default:
        utter.pitch = 1.05; utter.rate = 1.02; break;
    }

    utter.onstart = () => onStart && onStart();
    utter.onend = () => onEnd && onEnd();
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  } catch (e) {
    onStart && onStart();
    onEnd && onEnd();
  }
}

// Lightweight local brain returning text plus an emotion classification
function localFriendBrain(prompt, persona) {
  const p = prompt.trim();
  if (!p) return { text: `Hi, I'm ${persona}. How can I help today?`, emotion: 'neutral' };
  const lc = p.toLowerCase();

  if (/(hi|hello|hey|yo)\b/.test(lc)) return { text: `Hello! I'm ${persona}. Great to meet you.`, emotion: 'happy' };
  if (/thanks|thank you|appreciate/.test(lc)) return { text: "You're welcome! Happy to help.", emotion: 'happy' };
  if (/sad|down|upset|bad day/.test(lc)) return { text: "I'm here for you. Want to talk about it?", emotion: 'sad' };
  if (/joke|funny/.test(lc)) return { text: "Okay, one quick joke: Why did the developer go broke? Because he used up all his cache.", emotion: 'excited' };
  if (/idea|brainstorm|think/.test(lc)) return { text: "Let's think this through together.", emotion: 'thinking' };
  if (/wow|no way|really\?|amazing/.test(lc)) return { text: "Wild, right?", emotion: 'surprised' };
  if (/your name|who are you|what are you/.test(lc)) return { text: `I'm ${persona}, your virtual friend — here to chat in natural language.`, emotion: 'neutral' };

  // Default: reflect + neutral excitement
  return { text: `${persona}: ${p} — got it. Here's what I think…`, emotion: 'neutral' };
}

function Message({ role, content }) {
  const isUser = role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`${isUser ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-900'} max-w-[80%] rounded-2xl px-3 py-2 text-sm shadow`}>
        {content}
      </div>
    </div>
  );
}

export default function ChatPanel({ persona = 'Chitti', onAssistantSpeaking, onEmotion }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Hi! I'm ${persona}. I chat like a person, speak aloud, and show expressions.` },
  ]);
  const [input, setInput] = useState('');
  const [speaking, setSpeaking] = useState(false);
  const listRef = useRef(null);

  // Keep header speaking indicator in sync
  useEffect(() => { onAssistantSpeaking?.(speaking); }, [speaking, onAssistantSpeaking]);

  // Scroll on new message
  useEffect(() => { if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight; }, [messages.length]);

  // Update greeting if persona changes
  useEffect(() => {
    setMessages([{ role: 'assistant', content: `Hi! I'm ${persona}. I chat like a person, speak aloud, and show expressions.` }]);
  }, [persona]);

  // Ensure voices loaded on some browsers
  useEffect(() => {
    const id = setInterval(() => {
      // Trigger load of voices
      if (window.speechSynthesis?.getVoices?.().length) clearInterval(id);
    }, 250);
    return () => clearInterval(id);
  }, []);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text) return;
    const newList = [...messages, { role: 'user', content: text }];
    setMessages(newList);
    setInput('');

    // Create a local reply
    const { text: reply, emotion } = await new Promise((resolve) => {
      setTimeout(() => resolve(localFriendBrain(text, persona)), 250);
    });

    const finalList = [...newList, { role: 'assistant', content: reply }];
    setMessages(finalList);
    onEmotion?.(emotion);

    speak(reply, {
      persona,
      emotion,
      onStart: () => setSpeaking(true),
      onEnd: () => setSpeaking(false),
    });
  }, [input, messages, persona, onEmotion]);

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
        <p className="text-sm text-zinc-500">Talk to {persona} — replies are text and spoken with tone and expressions.</p>
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
            placeholder={`Message ${persona}…`}
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
