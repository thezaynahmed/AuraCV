'use client';

import React, { useState, useCallback } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { useShallow } from 'zustand/react/shallow';
import { SectionShell } from './SectionShell';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ListItemWrapper } from './ListItemWrapper';
import { Label } from '@/components/ui/label';
import { ResumeProject } from '@/lib/types/resume';
import { PlusCircle } from 'lucide-react';

export function ProjectsForm() {
  const isHydrated = useResumeStore((state) => state.isHydrated);
  const projects = useResumeStore(useShallow((state) => state.resume.sections?.projects || []));
  const addSectionItem = useResumeStore((state) => state.addSectionItem);
  const updateSectionItem = useResumeStore((state) => state.updateSectionItem);
  const removeSectionItem = useResumeStore((state) => state.removeSectionItem);

  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [currentProject, setCurrentProject] = useState<Omit<ResumeProject, 'id'> | null>(null);

  const handleInputChange = useCallback((field: keyof Omit<ResumeProject, 'id'>, value: string | string[]) => {
    setCurrentProject((prev) => ({
      ...(prev || { name: '', description: '', technologies: [], url: '', startDate: '', endDate: '' }),
      [field]: value,
    }));
  }, []);

  const handleSaveProject = useCallback(() => {
    if (currentProject) {
      if (editingProjectId && editingProjectId !== 'new') {
        updateSectionItem('projects', editingProjectId, currentProject);
      } else {
        const newProject: ResumeProject = {
          id: crypto.randomUUID(),
          ...currentProject
        };
        addSectionItem('projects', newProject);
      }
      setEditingProjectId(null);
      setCurrentProject(null);
    }
  }, [addSectionItem, updateSectionItem, editingProjectId, currentProject]);

  const handleCancelEdit = useCallback(() => {
    setEditingProjectId(null);
    setCurrentProject(null);
  }, []);

  if (!isHydrated) {
    return (
      <SectionShell 
        title="Projects" 
        description="Showcase your relevant projects and personal work."
      >
        <div className="h-32 flex items-center justify-center">
          <p className="text-zinc-500">Loading projects...</p>
        </div>
      </SectionShell>
    );
  }

  return (
    <SectionShell 
      title="Projects" 
      description="Showcase your relevant projects and personal work."
    >
      <div className="space-y-4">
        {projects.map((project: ResumeProject, index: number) => (
          <ListItemWrapper 
            key={project.id}
            title={project.name || 'Untitled Project'}
            onDelete={() => removeSectionItem('projects', project.id)}
            onMoveUp={() => {}}
            onMoveDown={() => {}}
            isFirst={index === 0}
            isLast={index === projects.length - 1}
          >
            <div className="text-sm text-zinc-500 space-y-1">
              <p>{project.description}</p>
              {project.url && <p className="text-blue-500">{project.url}</p>}
              {project.technologies.length > 0 && (
                <p className="text-xs">{project.technologies.join(', ')}</p>
              )}
              <button 
                onClick={() => {
                  setEditingProjectId(project.id);
                  setCurrentProject({
                    name: project.name,
                    description: project.description,
                    technologies: project.technologies,
                    url: project.url,
                    startDate: project.startDate,
                    endDate: project.endDate,
                  });
                }}
                className="text-xs text-blue-500 hover:underline mt-2"
              >
                Edit Project
              </button>
            </div>
          </ListItemWrapper>
        ))}

        {!editingProjectId && (
          <Button 
            variant="outline" 
            onClick={() => {
              setEditingProjectId('new');
              setCurrentProject({ 
                name: '', 
                description: '', 
                technologies: [], 
                url: '', 
                startDate: '',
                endDate: ''
              });
            }}
            className="w-full border-dashed"
          >
            <PlusCircle className="w-4 h-4 mr-2" /> Add Project
          </Button>
        )}

        {editingProjectId && (
          <div className="p-4 border rounded-md border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 space-y-4">
            <div>
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                value={currentProject?.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="projectDescription">Description</Label>
              <Input
                id="projectDescription"
                value={currentProject?.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Brief description of the project"
              />
            </div>
            <div>
              <Label htmlFor="projectTechnologies">Technologies (comma-separated)</Label>
              <Input
                id="projectTechnologies"
                value={currentProject?.technologies.join(', ') || ''}
                onChange={(e) => handleInputChange('technologies', e.target.value.split(',').map((tech: string) => tech.trim()))}
              />
            </div>
            <div>
              <Label htmlFor="projectUrl">Project URL</Label>
              <Input
                id="projectUrl"
                value={currentProject?.url || ''}
                onChange={(e) => handleInputChange('url', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="projectStartDate">Start Date</Label>
                <Input
                  id="projectStartDate"
                  value={currentProject?.startDate || ''}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                  placeholder="2023-01"
                />
              </div>
              <div>
                <Label htmlFor="projectEndDate">End Date</Label>
                <Input
                  id="projectEndDate"
                  value={currentProject?.endDate || ''}
                  onChange={(e) => handleInputChange('endDate', e.target.value)}
                  placeholder="2023-06"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
              <Button onClick={handleSaveProject}>Save Project</Button>
            </div>
          </div>
        )}
      </div>
    </SectionShell>
  );
}