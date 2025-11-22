'use client';

import { useResumeStore } from "@/store/useResumeStore";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Wand2 } from 'lucide-react';

export function SummaryForm() {
  const { resume, updateProfile } = useResumeStore((state) => ({
    resume: state.resume,
    updateProfile: state.updateProfile,
  }));
  const summary = resume.profile.summary;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateProfile('summary', e.target.value);
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="E.g., Results-driven Software Engineer with 5+ years of experience..."
        className="min-h-[200px]"
        value={summary || ''}
        onChange={handleChange}
      />
      <p className="text-xs text-zinc-400">
        Mention your years of experience, key skills, and major achievements.
      </p>
      <Button variant="outline" size="sm">
        <Wand2 className="w-4 h-4 mr-2" />
        AI Rewrite
      </Button>
    </div>
  );
}
