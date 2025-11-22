"use client";

import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export function PersonalForm() {
  const { resume, updateProfile, isHydrated, resetToDefaults } = useResumeStore();
  const profile = resume?.profile;

  // Auto-recover if profile is missing by resetting to defaults
  React.useEffect(() => {
    if (isHydrated && !profile) {
      console.log('Profile missing, resetting to defaults...');
      resetToDefaults();
    }
  }, [isHydrated, profile, resetToDefaults]);

  // Show loading while hydrating
  if (!isHydrated) {
    return (
      <div className="h-32 flex items-center justify-center">
        <p className="text-zinc-500">Loading...</p>
      </div>
    );
  }

  // If profile is still missing after recovery attempt, show a reset button
  if (!profile) {
    return (
      <div className="h-32 flex flex-col items-center justify-center gap-4">
        <p className="text-zinc-500">Initializing resume data...</p>
        <button 
          onClick={() => resetToDefaults()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Reset to Defaults
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
        <p className="text-sm text-zinc-500 mb-6">
          Enter your basic contact information and professional summary.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            value={profile.name || ''}
            onChange={(e) => updateProfile('name', e.target.value)}
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">Job Title *</Label>
          <Input
            id="title"
            value={profile.title || ''}
            onChange={(e) => updateProfile('title', e.target.value)}
            placeholder="Senior Software Engineer"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={profile.email || ''}
            onChange={(e) => updateProfile('email', e.target.value)}
            placeholder="john.doe@example.com"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            value={profile.phone || ''}
            onChange={(e) => updateProfile('phone', e.target.value)}
            placeholder="(555) 123-4567"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={profile.location || ''}
            onChange={(e) => updateProfile('location', e.target.value)}
            placeholder="San Francisco, CA"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="url">LinkedIn / Portfolio URL</Label>
          <Input
            id="url"
            type="url"
            value={profile.url || ''}
            onChange={(e) => updateProfile('url', e.target.value)}
            placeholder="linkedin.com/in/johndoe"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          value={profile.summary || ''}
          onChange={(e) => updateProfile('summary', e.target.value)}
          placeholder="A brief summary of your professional background and key achievements..."
          rows={5}
          className="resize-none"
        />
        <p className="text-xs text-zinc-500">
          Tip: Keep it concise (2-3 sentences). Highlight your expertise and what makes you unique.
        </p>
      </div>
    </div>
  );
}
