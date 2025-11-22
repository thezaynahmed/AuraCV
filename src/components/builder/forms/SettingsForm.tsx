'use client';

import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { useShallow } from 'zustand/react/shallow';
import { cn } from '@/lib/utils';

const fonts = [
  { name: 'Modern', value: 'Helvetica', class: 'font-sans' },
  { name: 'Classic', value: 'Times-Roman', class: 'font-serif' },
  { name: 'Technical', value: 'Courier', class: 'font-mono' },
];

const themeColors = [
  { name: 'Black', value: '#000000', class: 'bg-black' },
  { name: 'Navy Blue', value: '#1e3a8a', class: 'bg-[#1e3a8a]' },
  { name: 'Teal', value: '#0d9488', class: 'bg-[#0d9488]' },
  { name: 'Burgundy', value: '#7f1d1d', class: 'bg-[#7f1d1d]' },
  { name: 'Forest Green', value: '#14532d', class: 'bg-[#14532d]' },
];

export function SettingsForm() {
  const settings = useResumeStore(useShallow((state) => state.resume.settings));
  const updateSettings = useResumeStore((state) => state.updateSettings);

  const handleFontChange = (fontFamily: string) => {
    updateSettings('fontFamily', fontFamily);
  };

  const handleColorChange = (color: string) => {
    updateSettings('accentColor', color);
  };

  return (
    <div className="space-y-6 p-6 max-w-2xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Appearance</h2>
        
        <div className="space-y-8">
          {/* Typography Section */}
          <div className="bg-zinc-900/50 p-6 rounded-xl border border-white/5">
            <label className="text-sm font-medium text-zinc-400 mb-4 block uppercase tracking-wider">Typography</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {fonts.map((font) => (
                <button
                  key={font.value}
                  onClick={() => handleFontChange(font.value)}
                  className={cn(
                    "group relative p-4 rounded-lg border-2 transition-all duration-200 text-left",
                    settings.fontFamily === font.value
                      ? "bg-white border-white text-black shadow-lg scale-[1.02]"
                      : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:bg-zinc-900"
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium opacity-60">{font.name}</span>
                    {settings.fontFamily === font.value && (
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                    )}
                  </div>
                  <span className={cn("text-xl block", font.class)}>Ag</span>
                </button>
              ))}
            </div>
          </div>

          {/* Theme Color Section */}
          <div className="bg-zinc-900/50 p-6 rounded-xl border border-white/5">
             <label className="text-sm font-medium text-zinc-400 mb-4 block uppercase tracking-wider">Theme Color</label>
             <div className="flex flex-wrap gap-4">
               {themeColors.map((color) => (
                 <button
                   key={color.value}
                   onClick={() => handleColorChange(color.value)}
                   className={cn(
                     "group relative w-12 h-12 rounded-full border-2 transition-all duration-200 flex items-center justify-center",
                     settings.accentColor === color.value
                       ? "border-white scale-110 shadow-lg ring-2 ring-white/20"
                       : "border-transparent hover:scale-105"
                   )}
                   style={{ backgroundColor: color.value }}
                   title={color.name}
                 >
                   {settings.accentColor === color.value && (
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white drop-shadow-md">
                       <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                     </svg>
                   )}
                 </button>
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
