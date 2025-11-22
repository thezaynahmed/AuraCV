"use client";

import React, { useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, X } from 'lucide-react';
import type { ResumeSkill } from '@/lib/types/resume';

export function SkillsForm() {
  const { resume, addSectionItem, removeSectionItem, isHydrated } = useResumeStore();
  const skills = resume.sections?.skills || [];
  const [newSkillName, setNewSkillName] = useState('');

  if (!isHydrated) {
    return (
      <div className="h-32 flex items-center justify-center">
        <p className="text-zinc-500">Loading...</p>
      </div>
    );
  }

  const handleAdd = () => {
    if (newSkillName.trim()) {
      const newSkill: ResumeSkill = {
        id: crypto.randomUUID(),
        name: newSkillName.trim(),
        level: 'Intermediate',
      };
      addSectionItem('skills', newSkill);
      setNewSkillName('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-6">Skills</h2>
        <p className="text-sm text-zinc-500 mb-6">
          Add your technical and professional skills. They&apos;ll be displayed as tags on your resume.
        </p>
      </div>

      <div className="flex gap-2">
        <Input
          value={newSkillName}
          onChange={(e) => setNewSkillName(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="e.g., JavaScript, React, Python..."
          className="flex-1"
        />
        <Button onClick={handleAdd} disabled={!newSkillName.trim()}>
          <Plus className="w-4 h-4 mr-2" />
          Add
        </Button>
      </div>

      {skills.length > 0 && (
        <div>
          <Label className="mb-3 block">Your Skills ({skills.length})</Label>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill: ResumeSkill) => (
              <div
                key={skill.id}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm border border-blue-200 dark:border-blue-800"
              >
                <span>{skill.name}</span>
                <button
                  onClick={() => removeSectionItem('skills', skill.id)}
                  className="hover:text-blue-900 dark:hover:text-blue-100 transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {skills.length === 0 && (
        <div className="text-center py-8 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-lg">
          <p className="text-zinc-500 text-sm">No skills added yet. Add your first skill above!</p>
        </div>
      )}
    </div>
  );
}
