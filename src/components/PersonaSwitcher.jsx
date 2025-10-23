import React from 'react';

export default function PersonaSwitcher({ value = 'Chitti', onChange }) {
  const isChitti = value === 'Chitti';
  return (
    <div className="inline-flex items-center rounded-full border border-zinc-200 bg-white p-1 shadow-sm">
      <button
        onClick={() => onChange?.('Chitti')}
        className={`px-3 py-1.5 text-sm rounded-full transition ${isChitti ? 'bg-zinc-900 text-white' : 'text-zinc-700 hover:bg-zinc-100'}`}
        aria-pressed={isChitti}
      >
        Chitti
      </button>
      <button
        onClick={() => onChange?.('Vikki')}
        className={`px-3 py-1.5 text-sm rounded-full transition ${!isChitti ? 'bg-zinc-900 text-white' : 'text-zinc-700 hover:bg-zinc-100'}`}
        aria-pressed={!isChitti}
      >
        Vikki
      </button>
    </div>
  );
}
