"use client";

import React, { useState } from 'react';
import { BuilderLayout } from '@/components/builder/BuilderLayout';
import { PersonalForm } from '@/components/builder/forms/PersonalForm';
import { ExperienceForm } from '@/components/builder/forms/ExperienceForm';
import { EducationForm } from '@/components/builder/forms/EducationForm';
import { SkillsForm } from '@/components/builder/forms/SkillsForm';
import { ProjectsForm } from '@/components/builder/forms/ProjectsFormSimple';
import { DesignSettings } from '@/components/builder/forms/DesignSettings';
import { ATSWidget } from '@/components/builder/ATSWidget';
import { PDFPreview } from '@/components/builder/PDFPreview';
import { useResumeStore } from '@/store/useResumeStore';
import { Button } from '@/components/ui/button';

type Section = 'personal' | 'experience' | 'education' | 'skills' | 'projects' | 'design' | 'ats';

export default function BuilderPage() {
  const [activeSection, setActiveSection] = useState<Section>('personal');
  const { isHydrated } = useResumeStore();

  const sections: { id: Section; label: string }[] = [
    { id: 'personal', label: 'Personal Info' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'design', label: 'Design' },
    { id: 'ats', label: 'ATS Optimizer' },
  ];

  const renderForm = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalForm />;
      case 'experience':
        return <ExperienceForm />;
      case 'education':
        return <EducationForm />;
      case 'skills':
        return <SkillsForm />;
      case 'projects':
        return <ProjectsForm />;
      case 'design':
        return <DesignSettings />;
      case 'ats':
        return <ATSWidget />;
      default:
        return <PersonalForm />;
    }
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-zinc-900 dark:border-white mx-auto mb-4"></div>
          <p className="text-zinc-500">Loading AuraCV...</p>
        </div>
      </div>
    );
  }

  return (
    <BuilderLayout preview={<PDFPreview />}>
      {/* Section Navigation */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveSection(section.id)}
              className="text-xs"
            >
              {section.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Active Form */}
      <div className="pb-20">
        {renderForm()}
      </div>
    </BuilderLayout>
  );
}
