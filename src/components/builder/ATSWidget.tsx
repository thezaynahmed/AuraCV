"use client";

import React, { useState, useMemo } from 'react';
import { analyzeResume } from '@/lib/ats/analyzer';
import { useResumeStore } from '@/store/useResumeStore';
import { CheckCircle, XCircle } from 'lucide-react';

export function ATSWidget() {
  const { resume } = useResumeStore();
  const [jobDescription, setJobDescription] = useState('');
  
  // Load job description from localStorage on mount
  React.useEffect(() => {
    const saved = localStorage.getItem('auracv-job-description');
    if (saved) {
      setJobDescription(saved);
    }
  }, []);

  // Save job description to localStorage when it changes
  const handleJobDescriptionChange = (value: string) => {
    setJobDescription(value);
    localStorage.setItem('auracv-job-description', value);
  };
  
  // Construct resume text from state
  const resumeText = useMemo(() => {
     const { profile, sections } = resume;
     const parts = [
        profile.title,
        profile.summary,
        ...sections.experience.map(e => `${e.position} ${e.company} ${e.description}`),
        ...sections.education.map(e => `${e.degree} ${e.fieldOfStudy} ${e.institution}`),
        ...sections.skills.map(s => s.name),
        ...sections.projects.map(p => `${p.name} ${p.description} ${p.technologies.join(' ')}`)
     ];
     return parts.join(' ');
  }, [resume]);

  const result = useMemo(() => {
     return analyzeResume(resumeText, jobDescription);
  }, [resumeText, jobDescription]);

  const scoreColor = result.score >= 80 ? 'text-green-500' : result.score >= 50 ? 'text-yellow-500' : 'text-red-500';
  const strokeColor = result.score >= 80 ? '#22c55e' : result.score >= 50 ? '#eab308' : '#ef4444';

  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 shadow-sm">
       <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-blue-600" />
          ATS Optimizer
       </h3>
       
       <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
             <label className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300">
                Paste Job Description
             </label>
             <textarea
                value={jobDescription}
                onChange={(e) => handleJobDescriptionChange(e.target.value)}
                className="w-full h-40 p-3 rounded-md border border-zinc-300 dark:border-zinc-700 bg-transparent focus:ring-2 focus:ring-blue-500 text-sm"
                placeholder="Paste the job description here to analyze your resume..."
             />
          </div>

          <div className="w-full md:w-1/3 flex flex-col items-center justify-center">
             {/* Circular Progress */}
             <div className="relative w-32 h-32 mb-4">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                   <circle
                      className="text-zinc-200 dark:text-zinc-800 stroke-current"
                      strokeWidth="10"
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                   />
                   <circle
                      className={`${scoreColor} transition-all duration-1000 ease-out`}
                      strokeWidth="10"
                      strokeLinecap="round"
                      cx="50"
                      cy="50"
                      r="40"
                      fill="transparent"
                      stroke={strokeColor}
                      strokeDasharray="251.2"
                      strokeDashoffset={251.2 - (251.2 * result.score) / 100}
                      transform="rotate(-90 50 50)"
                   />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                   <span className={`text-3xl font-bold ${scoreColor}`}>{result.score}%</span>
                   <span className="text-xs text-zinc-500">Match</span>
                </div>
             </div>
          </div>
       </div>

       {jobDescription && (
          <div className="mt-6">
             <h4 className="font-medium text-sm mb-3 text-zinc-700 dark:text-zinc-300">Missing Keywords</h4>
             {result.missingKeywords.length === 0 ? (
                <p className="text-sm text-green-600 flex items-center gap-2">
                   <CheckCircle className="h-4 w-4" /> Great job! You matched all top keywords.
                </p>
             ) : (
                <div className="flex flex-wrap gap-2">
                   {result.missingKeywords.map(keyword => (
                      <span key={keyword} className="px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-xs rounded-full font-medium border border-red-200 dark:border-red-800 flex items-center gap-1">
                         <XCircle className="h-3 w-3" /> {keyword}
                      </span>
                   ))}
                </div>
             )}
          </div>
       )}
    </div>
  );
}
