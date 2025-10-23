import React from 'react';
import { Play, Move, ArrowUp, PartyPopper, Hand } from 'lucide-react';

export default function ActionsBar({ onEmote }) {
  const Button = ({ icon: Icon, label, action }) => (
    <button
      onClick={() => onEmote(action)}
      className="group inline-flex items-center gap-2 rounded-full bg-black text-white px-4 py-2 text-sm font-medium shadow hover:bg-zinc-800 active:scale-[0.98] transition"
      aria-label={label}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button icon={Move} label="Walk" action="walk" />
      <Button icon={ArrowUp} label="Jump" action="jump" />
      <Button icon={PartyPopper} label="Dance" action="dance" />
      <Button icon={Hand} label="Wave" action="wave" />
      <button
        onClick={() => onEmote(null)}
        className="inline-flex items-center gap-2 rounded-full bg-white border border-zinc-200 px-4 py-2 text-sm font-medium shadow-sm hover:bg-zinc-50 transition"
      >
        <Play className="h-4 w-4" />
        Clear
      </button>
    </div>
  );
}
