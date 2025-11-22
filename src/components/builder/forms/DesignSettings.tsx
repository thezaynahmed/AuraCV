"use client";

import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { FontFamily, ThemeColor } from '@/lib/types/resume';
import { Check } from 'lucide-react';

export function DesignSettings() {
  const { resume, updateSettings } = useResumeStore();
  const { settings } = resume;

  const fonts: { label: string; value: FontFamily; description: string }[] = [
    { label: 'Modern Sans', value: 'Helvetica', description: 'Clean and contemporary' },
    { label: 'Traditional Serif', value: 'Times-Roman', description: 'Classic and authoritative' },
    { label: 'Technical Mono', value: 'Courier', description: 'Precise and code-like' },
  ];

  const themes: { label: string; value: ThemeColor; description: string }[] = [
    { label: 'The Minimalist', value: 'minimalist', description: 'Black & white, clean lines' },
    { label: 'The Professional', value: 'modern', description: 'Navy accents, bold headers' },
    { label: 'The Creative', value: 'classic', description: 'Teal accents, modern layout' },
  ];

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-lg font-semibold mb-4">Typography</h2>
        <div className="grid grid-cols-1 gap-3">
          {fonts.map((font) => (
            <button
              key={font.value}
              onClick={() => updateSettings('fontFamily', font.value)}
              className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                settings.fontFamily === font.value
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 ring-1 ring-blue-600'
                  : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
            >
              <div className="text-left">
                <div className="font-medium">{font.label}</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">{font.description}</div>
              </div>
              {settings.fontFamily === font.value && (
                <Check className="h-4 w-4 text-blue-600" />
              )}
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-4">Theme</h2>
        <div className="grid grid-cols-1 gap-3">
          {themes.map((theme) => (
            <button
              key={theme.value}
              onClick={() => updateSettings('theme', theme.value)}
              className={`flex items-center justify-between p-4 rounded-lg border transition-all ${
                settings.theme === theme.value
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 ring-1 ring-blue-600'
                  : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
            >
              <div className="text-left">
                <div className="font-medium">{theme.label}</div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400">{theme.description}</div>
              </div>
              {settings.theme === theme.value && (
                <Check className="h-4 w-4 text-blue-600" />
              )}
            </button>
          ))}
        </div>
      </section>
      
      <section>
         <h2 className="text-lg font-semibold mb-4">Accent Color</h2>
         <div className="flex gap-3 flex-wrap">
            {['#000000', '#1d4ed8', '#0f766e', '#7e22ce', '#c2410c'].map((color) => (
               <button
                  key={color}
                  onClick={() => updateSettings('accentColor', color)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                     settings.accentColor === color 
                        ? color === '#000000'
                           ? 'border-white dark:border-zinc-900 ring-2 ring-blue-500 scale-110' // Add a white border for black when selected
                           : 'border-zinc-900 dark:border-white scale-110' 
                        : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
               />
            ))}
         </div>
      </section>
    </div>
  );
}
