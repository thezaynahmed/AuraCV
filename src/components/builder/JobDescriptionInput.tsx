import React from 'react';

export const JobDescriptionInput = () => {
  return (
    <div className="p-4 border-b border-white/10">
      <input 
        type="text" 
        placeholder="Paste job description URL or text here..." 
        className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-2 text-sm text-zinc-300 focus:outline-none focus:border-zinc-600"
      />
    </div>
  );
};
