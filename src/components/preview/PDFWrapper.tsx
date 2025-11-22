'use client';

import React, { useState, useEffect } from 'react';
import { useResumeStore } from '@/store/useResumeStore';
import { ProfessionalTemplate } from '@/components/templates/ProfessionalTemplate';
import type { Resume } from '@/lib/types/resume';

// Sanitize resume data to ensure it's safe for PDF rendering
function sanitizeResumeData(resume: Resume): Resume {
  if (!resume) return resume;
  
  return {
    ...resume,
    profile: resume.profile || {
      name: '',
      email: '',
      phone: '',
      location: '',
      url: '', // Using url for website/portfolio
      title: '',
      summary: '',
    },
    sections: {
      experience: Array.isArray(resume.sections?.experience) ? resume.sections.experience : [],
      education: Array.isArray(resume.sections?.education) ? resume.sections.education : [],
      skills: Array.isArray(resume.sections?.skills) ? resume.sections.skills : [],
      projects: Array.isArray(resume.sections?.projects) ? resume.sections.projects : [],
    },
    settings: resume.settings || {
      fontFamily: 'Helvetica',
      theme: 'modern',
      accentColor: '#000000',
      documentSize: 'Letter',
    }
  };
}

// This component gets the resume data from the store and passes it to the template.
export function PDFWrapper() {
  const resume = useResumeStore((state) => state.resume);
  const isHydrated = useResumeStore((state) => state.isHydrated);
  const [isMounted, setIsMounted] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  
  // Debounced resume state
  const [debouncedResume, setDebouncedResume] = useState<Resume>(resume);

  // Ensure we only mount in browser
  useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  // Debounce resume updates
  useEffect(() => {
    const timer = setTimeout(() => {
      if (resume) {
        setDebouncedResume(resume);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [resume]);

  // Generate PDF Blob URL
  useEffect(() => {
    if (!debouncedResume || !isMounted) return;

    const generatePdf = async () => {
      try {
        const sanitized = sanitizeResumeData(debouncedResume);
        // Dynamically import pdf to avoid SSR issues
        const { pdf } = await import('@react-pdf/renderer');
        const blob = await pdf(<ProfessionalTemplate resume={sanitized} />).toBlob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
        
        // Cleanup previous URL to avoid memory leaks
        return () => URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Failed to generate PDF:", error);
      }
    };

    generatePdf();
  }, [debouncedResume, isMounted]);

  if (!isHydrated || !isMounted || !pdfUrl) {
    return (
       <div className="w-full h-full flex items-center justify-center bg-zinc-900">
        <p className="text-zinc-500 animate-pulse">Loading Resume Data...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full border-l border-white/10 bg-zinc-900 flex flex-col">
      <iframe 
        src={pdfUrl} 
        className="w-full h-full border-none"
        title="Resume Preview"
      />
    </div>
  );
}
