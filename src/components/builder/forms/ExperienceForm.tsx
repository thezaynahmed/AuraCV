"use client";

import React, { useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Plus, GripVertical, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import type { ResumeExperience } from '@/lib/types/resume';

export function ExperienceForm() {
  const { resume, addSectionItem, removeSectionItem, updateSectionItem, reorderSection, isHydrated } = useResumeStore();
  const experience = resume.sections?.experience || [];
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!isHydrated) {
    return (
      <div className="h-32 flex items-center justify-center">
        <p className="text-zinc-500">Loading...</p>
      </div>
    );
  }

  const handleAdd = () => {
    const newExperience: ResumeExperience = {
      id: crypto.randomUUID(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
    addSectionItem('experience', newExperience);
    setExpandedId(newExperience.id);
  };

  const handleUpdate = (id: string, field: keyof ResumeExperience, value: string | boolean) => {
    updateSectionItem('experience', id, { [field]: value });
  };

  const handleReorder = (id: string, direction: 'up' | 'down') => {
    const index = experience.findIndex((exp: ResumeExperience) => exp.id === id);
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < experience.length) {
      const newOrder = [...experience];
      const [removed] = newOrder.splice(index, 1);
      newOrder.splice(newIndex, 0, removed);
      reorderSection('experience', newOrder);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-6">Work Experience</h2>
        <p className="text-sm text-zinc-500 mb-6">
          List your work history in reverse chronological order (most recent first).
        </p>
      </div>

      <div className="space-y-3">
        {experience.map((exp: ResumeExperience, index: number) => (
          <div
            key={exp.id}
            className="border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900"
          >
            <div className="flex items-center gap-2 p-3">
              <button className="cursor-grab text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">
                <GripVertical className="h-5 w-5" />
              </button>

              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">
                  {exp.position || 'Untitled Position'} {exp.company && `at ${exp.company}`}
                </h4>
                <p className="text-xs text-zinc-500">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </p>
              </div>

              <div className="flex items-center gap-1">
                {index > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleReorder(exp.id, 'up')}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                )}
                {index < experience.length - 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleReorder(exp.id, 'down')}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                  className="h-8 w-8 p-0"
                >
                  {expandedId === exp.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSectionItem('experience', exp.id)}
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {expandedId === exp.id && (
              <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Position Title *</Label>
                    <Input
                      value={exp.position}
                      onChange={(e) => handleUpdate(exp.id, 'position', e.target.value)}
                      placeholder="Senior Software Engineer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Company *</Label>
                    <Input
                      value={exp.company}
                      onChange={(e) => handleUpdate(exp.id, 'company', e.target.value)}
                      placeholder="Tech Corp Inc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <Input
                      value={exp.location}
                      onChange={(e) => handleUpdate(exp.id, 'location', e.target.value)}
                      placeholder="San Francisco, CA"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      value={exp.startDate}
                      onChange={(e) => handleUpdate(exp.id, 'startDate', e.target.value)}
                      placeholder="2020-01"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      value={exp.endDate}
                      onChange={(e) => handleUpdate(exp.id, 'endDate', e.target.value)}
                      placeholder="2023-12"
                      disabled={exp.current}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`current-${exp.id}`}
                      checked={exp.current}
                      onChange={(e) => handleUpdate(exp.id, 'current', e.target.checked)}
                      className="h-4 w-4"
                    />
                    <Label htmlFor={`current-${exp.id}`} className="cursor-pointer">
                      I currently work here
                    </Label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description & Achievements</Label>
                  <Textarea
                    value={exp.description}
                    onChange={(e) => handleUpdate(exp.id, 'description', e.target.value)}
                    placeholder="• Led the migration of legacy systems&#10;• Improved performance by 40%&#10;• Mentored junior developers"
                    rows={6}
                  />
                  <p className="text-xs text-zinc-500">
                    Tip: Use bullet points (•) to list your key achievements and responsibilities.
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Button variant="outline" className="w-full border-dashed" onClick={handleAdd}>
        <Plus className="w-4 h-4 mr-2" />
        Add Experience
      </Button>
    </div>
  );
}
