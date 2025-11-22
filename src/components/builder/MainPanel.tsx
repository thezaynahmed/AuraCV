'use client';

import React from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { JobDescriptionInput } from './JobDescriptionInput';
import { ATSScoreCard } from './ats/ATSScoreCard';
import { PersonalForm } from './forms/PersonalForm'; // Corrected path
import { SummaryForm } from './forms/SummaryForm';   // Corrected path
import { ExperienceForm } from './forms/ExperienceForm'; // Corrected path
import { EducationForm } from './forms/EducationForm';   // Corrected path

import { SettingsForm } from './forms/SettingsForm';

export const MainPanel = () => {
  const viewMode = useResumeStore((state) => state.viewMode);

  const renderContent = () => {
    switch (viewMode) {
      case 'editor':
        return (
          <>
            <div className="p-8">
              <h1 className="text-2xl font-bold text-white mb-6">Resume Editor</h1>
              <p className="text-zinc-400">Select a section from the navigation to start editing.</p>
            </div>
            {/* These forms are conceptually part of the editor view, but we'll integrate section navigation later */}
            <PersonalForm />
            <SummaryForm />
            <ExperienceForm />
            <EducationForm />
          </>
        );
      case 'ats-score':
        return <ATSScoreCard />;
      case 'settings':
        return <SettingsForm />;
      default:
        return (
          <div className="p-8">
            <h1 className="text-2xl font-bold text-white mb-6">Welcome</h1>
            <p className="text-zinc-400">Please select a view mode.</p>
          </div>
        );
    }
  };

  return (
    <main className="flex-1 h-full overflow-y-auto">
        <JobDescriptionInput />
        {renderContent()}
    </main>
  );
};
