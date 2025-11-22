'use client';

import { useResumeStore } from "@/store/useResumeStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SectionShell } from "./SectionShell";
import { ListItemWrapper } from "./ListItemWrapper";
import type { ResumeEducation } from "@/lib/types/resume";

export function EducationForm() {
  const isHydrated = useResumeStore((state) => state.isHydrated);
  const { resume, addSectionItem, removeSectionItem, updateSectionItem, reorderSection } = useResumeStore();
  const education = Array.isArray(resume.sections?.education) ? resume.sections.education : [];

  if (!isHydrated) {
    return (
      <SectionShell title="Education" description="List your academic background and degrees.">
        <div className="h-32 flex items-center justify-center">
          <p className="text-zinc-500">Loading education...</p>
        </div>
      </SectionShell>
    );
  }

  const handleAdd = () => {
    const newEducation: ResumeEducation = {
      id: crypto.randomUUID(),
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startDate: "",
      endDate: "",
      current: false,
      location: "",
      description: "",
    };
    addSectionItem("education", newEducation);
  };

  const handleRemove = (id: string) => {
    removeSectionItem("education", id);
  };

  const handleUpdate = (id: string, field: keyof ResumeEducation, value: ResumeEducation[typeof field]) => {
    updateSectionItem("education", id, { [field]: value });
  };

  const handleReorder = (id: string, direction: 'up' | 'down') => {
    const index = education.findIndex((edu: ResumeEducation) => edu.id === id);
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex >= 0 && newIndex < education.length) {
      const newOrder = [...education];
      const [removed] = newOrder.splice(index, 1);
      newOrder.splice(newIndex, 0, removed);
      reorderSection("education", newOrder);
    }
  };
  
  return (
    <SectionShell title="Education" description="List your academic background and degrees.">
      <div className="space-y-4">
        {education.map((edu, index) => (
          <ListItemWrapper
            key={edu.id}
            title={`${edu.degree || 'Untitled Degree'} at ${edu.institution || 'Untitled School'}`}
            onDelete={() => handleRemove(edu.id)}
            onMoveUp={() => handleReorder(edu.id, 'up')}
            onMoveDown={() => handleReorder(edu.id, 'down')}
            isFirst={index === 0}
            isLast={index === education.length - 1}
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Institution</Label>
                <Input value={edu.institution} onChange={(e) => handleUpdate(edu.id, "institution", e.target.value)} placeholder="Stanford University" />
              </div>
              <div className="space-y-2">
                <Label>Degree</Label>
                <Input value={edu.degree} onChange={(e) => handleUpdate(edu.id, "degree", e.target.value)} placeholder="B.S. in Computer Science" />
              </div>
              <div className="space-y-2">
                <Label>Start Date</Label>
                <Input value={edu.startDate} onChange={(e) => handleUpdate(edu.id, "startDate", e.target.value)} placeholder="Sep 2018" />
              </div>
              <div className="space-y-2">
                <Label>End Date</Label>
                <Input value={edu.endDate} onChange={(e) => handleUpdate(edu.id, "endDate", e.target.value)} placeholder="Jun 2022" />
              </div>
              <div className="space-y-2">
                <Label>Field of Study</Label>
                <Input value={edu.fieldOfStudy} onChange={(e) => handleUpdate(edu.id, "fieldOfStudy", e.target.value)} placeholder="Computer Science" />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input value={edu.location} onChange={(e) => handleUpdate(edu.id, "location", e.target.value)} placeholder="Stanford, CA" />
              </div>
            </div>
          </ListItemWrapper>
        ))}
        <Button variant="outline" className="w-full border-dashed" onClick={handleAdd}>
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </div>
    </SectionShell>
  );
}
