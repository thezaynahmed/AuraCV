import React, { useState, useCallback } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { useShallow } from 'zustand/react/shallow';
import { SectionShell } from './SectionShell';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ListItemWrapper } from './ListItemWrapper';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ResumeSkill } from '@/lib/types/resume'; // Assuming Skill type is in types.ts
import { PlusCircle } from 'lucide-react';

const skillLevels = ["Beginner", "Intermediate", "Advanced", "Expert"] as const;

export function SkillsForm() {
  const isHydrated = useResumeStore((state) => state.isHydrated);
  const skills = useResumeStore(useShallow((state) => state.resume.sections?.skills || []));
  const addSectionItem = useResumeStore((state) => state.addSectionItem);
  const updateSectionItem = useResumeStore((state) => state.updateSectionItem);
  const removeSectionItem = useResumeStore((state) => state.removeSectionItem);

  const [editingSkillId, setEditingSkillId] = useState<string | null>(null);
  const [currentSkill, setCurrentSkill] = useState<Omit<ResumeSkill, 'id'> | null>(null);

  const handleInputChange = useCallback((field: keyof Omit<ResumeSkill, 'id'>, value: string | typeof skillLevels[number]) => {
    setCurrentSkill((prev) => ({
      ...(prev || { name: '', level: 'Beginner' }),
      [field]: value,
    }));
  }, []);

  const handleSaveSkill = useCallback(() => {
    if (currentSkill) {
      if (editingSkillId && editingSkillId !== 'new') {
        updateSectionItem('skills', editingSkillId, currentSkill);
      } else {
        addSectionItem('skills', { ...currentSkill, id: crypto.randomUUID() });
      }
      setEditingSkillId(null);
      setCurrentSkill(null);
    }
  }, [addSectionItem, updateSectionItem, editingSkillId, currentSkill]);

  const handleCancelEdit = useCallback(() => {
    setEditingSkillId(null);
    setCurrentSkill(null);
  }, []);

  if (!isHydrated) {
    return (
      <SectionShell 
        title="Skills" 
        description="Highlight your technical and soft skills."
      >
        <div className="h-32 flex items-center justify-center">
          <p className="text-zinc-500">Loading skills...</p>
        </div>
      </SectionShell>
    );
  }

  return (
    <SectionShell 
      title="Skills" 
      description="Highlight your technical and soft skills."
    >
      <div className="space-y-4">
        {skills.map((skill) => (
          <ListItemWrapper 
            key={skill.id}
            title={`${skill.name || 'Untitled Skill'} (${skill.level || 'Unknown'})`}
            onEdit={() => {
              setEditingSkillId(skill.id);
              setCurrentSkill({
                name: skill.name,
                level: skill.level,
              });
            }}
            onDelete={() => removeSectionItem('skills', skill.id)}
          ><></></ListItemWrapper>
        ))}

        {!editingSkillId && (
          <Button 
            variant="outline" 
            onClick={() => {
              setEditingSkillId('new'); // Use 'new' as a temporary ID for new skill
              setCurrentSkill({ name: '', level: 'Beginner' });
            }}
            className="w-full"
          >
            <PlusCircle className="w-4 h-4 mr-2" /> Add Skill
          </Button>
        )}

        {(editingSkillId || (currentSkill && !editingSkillId)) && (
          <div className="p-4 border rounded-md border-zinc-700 bg-zinc-800 space-y-4">
            <div>
              <Label htmlFor="skillName">Skill Name</Label>
              <Input
                id="skillName"
                value={currentSkill?.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="skillLevel">Level</Label>
              <Select
                value={currentSkill?.level || 'Beginner'}
                onValueChange={(value) => handleInputChange('level', value as typeof skillLevels[number])}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a level" />
                </SelectTrigger>
                <SelectContent>
                  {skillLevels.map((level) => (
                    <SelectItem key={level} value={level}>{level}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleCancelEdit}>Cancel</Button>
              <Button onClick={handleSaveSkill}>Save Skill</Button>
            </div>
          </div>
        )}
      </div>
    </SectionShell>
  );
}
