"use client";

import React, { useState } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Plus, GripVertical, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import type { ResumeProject } from '@/lib/types/resume';

export function ProjectsForm() {
  const { resume, addSectionItem, removeSectionItem, updateSectionItem, reorderSection, isHydrated } = useResumeStore();
  const projects = resume.sections?.projects || [];
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!isHydrated) {
    return (
      <div className="h-32 flex items-center justify-center">
        <p className="text-zinc-500">Loading...</p>
      </div>
    );
  }

  const handleAdd = () => {
    const newProject: ResumeProject = {
      id: crypto.randomUUID(),
      name: '',
      description: '',
      url: '',
      technologies: [],
      startDate: '',
      endDate: '',
    };
    addSectionItem('projects', newProject);
    setExpandedId(newProject.id);
  };

  const handleUpdate = (id: string, field: keyof ResumeProject, value: string | string[]) => {
    updateSectionItem('projects', id, { [field]: value });
  };

  const handleReorder = (id: string, direction: 'up' | 'down') => {
    const index = projects.findIndex((proj: ResumeProject) => proj.id === id);
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < projects.length) {
      const newOrder = [...projects];
      const [removed] = newOrder.splice(index, 1);
      newOrder.splice(newIndex, 0, removed);
      reorderSection('projects', newOrder);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-6">Projects</h2>
        <p className="text-sm text-zinc-500 mb-6">
          Showcase your personal or professional projects that demonstrate your skills.
        </p>
      </div>

      <div className="space-y-3">
        {projects.map((project: ResumeProject, index: number) => (
          <div
            key={project.id}
            className="border border-zinc-200 dark:border-zinc-800 rounded-lg bg-white dark:bg-zinc-900"
          >
            <div className="flex items-center gap-2 p-3">
              <button className="cursor-grab text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300">
                <GripVertical className="h-5 w-5" />
              </button>

              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm truncate">
                  {project.name || 'Untitled Project'}
                </h4>
                {project.technologies.length > 0 && (
                  <p className="text-xs text-zinc-500 truncate">
                    {project.technologies.join(', ')}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-1">
                {index > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleReorder(project.id, 'up')}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                )}
                {index < projects.length - 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleReorder(project.id, 'down')}
                    className="h-8 w-8 p-0"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setExpandedId(expandedId === project.id ? null : project.id)}
                  className="h-8 w-8 p-0"
                >
                  {expandedId === project.id ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSectionItem('projects', project.id)}
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {expandedId === project.id && (
              <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2 col-span-2">
                    <Label>Project Name *</Label>
                    <Input
                      value={project.name}
                      onChange={(e) => handleUpdate(project.id, 'name', e.target.value)}
                      placeholder="E-commerce Platform"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input
                      value={project.startDate}
                      onChange={(e) => handleUpdate(project.id, 'startDate', e.target.value)}
                      placeholder="2023-01"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Input
                      value={project.endDate}
                      onChange={(e) => handleUpdate(project.id, 'endDate', e.target.value)}
                      placeholder="2023-06"
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>Project URL</Label>
                    <Input
                      value={project.url}
                      onChange={(e) => handleUpdate(project.id, 'url', e.target.value)}
                      placeholder="github.com/username/project"
                    />
                  </div>
                  <div className="space-y-2 col-span-2">
                    <Label>Technologies (comma-separated)</Label>
                    <Input
                      value={project.technologies.join(', ')}
                      onChange={(e) => handleUpdate(project.id, 'technologies', e.target.value.split(',').map(t => t.trim()).filter(Boolean))}
                      placeholder="React, Node.js, MongoDB, AWS"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={project.description}
                    onChange={(e) => handleUpdate(project.id, 'description', e.target.value)}
                    placeholder="Brief description of the project and your role..."
                    rows={4}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Button variant="outline" className="w-full border-dashed" onClick={handleAdd}>
        <Plus className="w-4 h-4 mr-2" />
        Add Project
      </Button>
    </div>
  );
}
