'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Eye, X } from 'lucide-react';
import { PersonalForm } from './forms/PersonalForm';
import { SummaryForm } from './forms/SummaryForm';
import { ExperienceForm } from './forms/ExperienceForm';
import { EducationForm } from './forms/EducationForm';
import { ProjectsForm } from './forms/ProjectsForm';
import { SkillsForm } from './forms/SkillsForm';

const sections = [
  "Personal",
  "Summary",
  "Experience",
  "Education",
  "Projects",
  "Skills",
];

// Navigation Sub-component
const EditorNavigation = ({
  activeSection,
  setActiveSection,
}: {
  activeSection: string;
  setActiveSection: (section: string) => void;
}) => (
  <div className="p-4 border-b border-white/10 sticky top-0 bg-zinc-950 z-10">
    <div className="flex items-center overflow-x-auto pb-2 -mb-2">
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => setActiveSection(section)}
          className={cn(
            'px-4 py-2 text-sm font-medium rounded-md whitespace-nowrap transition-colors',
            activeSection === section
              ? 'bg-zinc-800 text-white'
              : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
          )}
        >
          {section}
        </button>
      ))}
    </div>
  </div>
);

// Main Layout Component
export function EditorLayout({ children: pdfPreview }: { children: React.ReactNode }) {
  const [activeSection, setActiveSection] = useState(sections[0]);
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      <div className="flex flex-col lg:flex-row">
        {/* Left Panel (Form) */}
        <div className="w-full lg:w-1/2 h-screen overflow-y-auto bg-zinc-950">
          <EditorNavigation
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
          <div className="p-8">
            {/* Render form based on active section */}
            {activeSection === 'Personal' && <PersonalForm />}
            {activeSection === 'Summary' && <SummaryForm />}
            {activeSection === 'Experience' && <ExperienceForm />}
            {activeSection === 'Education' && <EducationForm />}
            {activeSection === 'Projects' && <ProjectsForm />}
            {activeSection === 'Skills' && <SkillsForm />}
          </div>
        </div>

        {/* Right Panel (Preview) - Desktop */}
        <div className="hidden lg:block lg:w-1/2 h-screen sticky top-0 bg-zinc-900">
          {pdfPreview}
        </div>

        {/* Mobile Preview (Modal Overlay) */}
        {showPreview && (
          <div className="lg:hidden fixed inset-0 bg-zinc-900 z-40">
            <div className="w-full h-full">{pdfPreview}</div>
            <button
              onClick={() => setShowPreview(false)}
              className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Mobile FAB to show preview */}
      <div className="lg:hidden fixed bottom-6 right-6 z-30">
        <button
          onClick={() => setShowPreview(true)}
          className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
        >
          <Eye className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}


