'use client';

import { useResumeStore } from "@/store/useResumeStore";
import { useShallow } from 'zustand/react/shallow'
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionShell } from "./SectionShell";
import { ResumeProfile } from "@/lib/types/resume"; // Import ResumeProfile

// Type guard to check if a string is a valid key of ResumeProfile
const isResumeProfileKey = (key: string): key is keyof ResumeProfile => {
  const validKeys: Array<keyof ResumeProfile> = ['name', 'location', 'email', 'phone', 'url', 'title', 'summary'];
  return validKeys.includes(key as keyof ResumeProfile);
};

export function PersonalForm() {
  const isHydrated = useResumeStore((state) => state.isHydrated);
  const { resume, updateProfile } = useResumeStore(useShallow((state) => ({
    resume: state.resume,
    updateProfile: state.updateProfile,
  })));
  const profile = resume.profile;

  if (!isHydrated) {
    return (
      <SectionShell title="Personal Details" description="This information will be displayed at the top of your resume.">
        <div className="h-32 flex items-center justify-center">
          <p className="text-zinc-500">Loading personal details...</p>
        </div>
      </SectionShell>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (isResumeProfileKey(name)) {
      updateProfile(name, value);
    } else {
      console.warn(`Attempted to update unknown profile field: ${name}`);
    }
  };

  return (
    <SectionShell title="Personal Details" description="This information will be displayed at the top of your resume.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="John Doe"
            value={profile.name || ''}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            name="location"
            placeholder="San Francisco, CA"
            value={profile.location || ''}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="john.doe@email.com"
            value={profile.email || ''}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            placeholder="(123) 456-7890"
            value={profile.phone || ''}
            onChange={handleChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="url">Website/Portfolio URL</Label>
          <Input
            id="url"
            name="url"
            placeholder="https://your-portfolio.com"
            value={profile.url || ''}
            onChange={handleChange}
          />
        </div>
      </div>
    </SectionShell>
  );
}
