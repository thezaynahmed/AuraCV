'use client';

import { useResumeStore } from "@/store/useResumeStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Plus } from "lucide-react";
import { SectionShell } from "./SectionShell";
import { ListItemWrapper } from "./ListItemWrapper";
import type { ResumeExperience } from "@/lib/types/resume";

export function ExperienceForm() {
  const isHydrated = useResumeStore((state) => state.isHydrated);
  const { resume, addSectionItem, removeSectionItem, reorderSection, updateSectionItem } = useResumeStore();
  const experience = Array.isArray(resume.sections?.experience) ? resume.sections.experience : [];

  if (!isHydrated) {
    return (
      <SectionShell title="Work Experience" description="List your professional roles and responsibilities.">
        <div className="h-32 flex items-center justify-center">
          <p className="text-zinc-500">Loading experience...</p>
        </div>
      </SectionShell>
    );
  }

  const handleAdd = () => {
    const newExperience: ResumeExperience = {
      id: crypto.randomUUID(),
      company: "",
      position: "",
      location: "", // Added missing location field
      startDate: "",
      endDate: "",
      current: false,
      description: "", // Changed summary to description
    };
    addSectionItem("experience", newExperience);
  };

  const handleRemove = (id: string) => {
    removeSectionItem("experience", id);
  };

  const handleUpdate = (id: string, field: keyof ResumeExperience, value: ResumeExperience[typeof field]) => {
    updateSectionItem("experience", id, { [field]: value });
  };

  const handleReorder = (id: string, direction: 'up' | 'down') => {
    const index = experience.findIndex(exp => exp.id === id);
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < experience.length) {
      const newOrder = [...experience];
      const [removed] = newOrder.splice(index, 1);
      newOrder.splice(newIndex, 0, removed);
      reorderSection("experience", newOrder);
    }
  };
  
  return (
    <SectionShell title="Work Experience" description="List your professional roles and responsibilities.">
      <div className="space-y-4">
        {experience.map((exp, index) => (
          <ListItemWrapper
            key={exp.id}
            title={`${exp.position || 'Untitled Role'} at ${exp.company || 'Untitled Company'}`}
            onDelete={() => handleRemove(exp.id)}
            onMoveUp={() => handleReorder(exp.id, 'up')}
            onMoveDown={() => handleReorder(exp.id, 'down')}
            isFirst={index === 0}
            isLast={index === experience.length - 1}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Company</Label>
                <Input value={exp.company} onChange={(e) => handleUpdate(exp.id, "company", e.target.value)} placeholder="Google" />
              </div>
              <div className="space-y-2">
                <Label>Position</Label>
                <Input value={exp.position} onChange={(e) => handleUpdate(exp.id, "position", e.target.value)} placeholder="Software Engineer" />
              </div>
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input value={exp.startDate} onChange={(e) => handleUpdate(exp.id, "startDate", e.target.value)} placeholder="Jan 2022" />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input value={exp.endDate} onChange={(e) => handleUpdate(exp.id, "endDate", e.target.value)} placeholder="Present" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <Label>Description / Bullets</Label>
              <RichTextEditor
                value={exp.description || ''}
                onChange={(value) => handleUpdate(exp.id, "description", value)}
                placeholder="• Led a team of 5 engineers...&#10;• Increased user engagement by 20%..."
                minHeight="100px"
              />
            </div>
          </ListItemWrapper>
        ))}
        <Button variant="outline" className="w-full border-dashed" onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Position
        </Button>
      </div>
    </SectionShell>
  );
}
