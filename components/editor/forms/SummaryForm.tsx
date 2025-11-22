'use client';

import { useCallback } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { useShallow } from "zustand/react/shallow";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Button } from "@/components/ui/button";
import { Sparkles } from 'lucide-react';
import { SectionShell } from "./SectionShell";

export function SummaryForm() {
  const isHydrated = useResumeStore((state) => state.isHydrated);
  const updateProfile = useResumeStore((state) => state.updateProfile);
  const summary = useResumeStore(useShallow((state) => state.resume.profile.summary));

  const handleChange = useCallback((value: string) => {
    updateProfile('summary', value);
  }, [updateProfile]);

  if (!isHydrated) {
    return (
      <SectionShell 
        title="Professional Summary" 
        description="Write a brief summary of your career, skills, and goals. This is your elevator pitch."
      >
        <div className="h-32 flex items-center justify-center">
          <p className="text-zinc-500">Loading summary...</p>
        </div>
      </SectionShell>
    );
  }

  return (
    <SectionShell 
      title="Professional Summary" 
      description="Write a brief summary of your career, skills, and goals. This is your elevator pitch."
    >
      <div className="relative">
        <RichTextEditor
          placeholder="E.g., Innovative and deadline-driven Software Engineer with 5+ years of experience..."
          minHeight="120px"
          value={summary || ''}
          onChange={handleChange}
        />
        <Button 
          variant="outline" 
          size="sm" 
          className="absolute bottom-3 right-3 text-xs z-10"
        >
          <Sparkles className="w-3 h-3 mr-2" />
          Generate Summary
        </Button>
      </div>
    </SectionShell>
  );
}
