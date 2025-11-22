import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  Resume, 
  ResumeProfile, 
  ResumeSettings, 
  ResumeSection,
  initialResumeState,
  FontFamily,
  ThemeColor,
  DocumentSize,
  ResumeExperience,
  ResumeEducation,
  ResumeSkill,
  ResumeProject,
  SectionItemType
} from '@/lib/types/resume';

interface ResumeState {
  resume: Resume;
  isHydrated: boolean;
  viewMode: 'editor' | 'ats-score' | 'settings' | 'default';
  
  // Actions
  setHydrated: (state: boolean) => void;
  updateProfile: (field: keyof ResumeProfile, value: string) => void;
  updateSettings: (field: keyof ResumeSettings, value: FontFamily | ThemeColor | string | DocumentSize) => void;
  addSectionItem: <K extends keyof ResumeSection>(sectionKey: K, item: SectionItemType<K>) => void;
  removeSectionItem: <K extends keyof ResumeSection>(sectionKey: K, id: string) => void;
  updateSectionItem: <K extends keyof ResumeSection>(sectionKey: K, id: string, updates: Partial<SectionItemType<K>>) => void;
  reorderSection: <K extends keyof ResumeSection>(sectionKey: K, newOrder: SectionItemType<K>[]) => void;
  setViewMode: (mode: 'editor' | 'ats-score' | 'settings' | 'default') => void;
  resetToDefaults: () => void;
}

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      resume: initialResumeState,
      isHydrated: false,
      viewMode: 'editor', // Initial value for viewMode

      setHydrated: (state) => set({ isHydrated: state }),

      updateProfile: (field, value) =>
        set((state) => ({
          resume: {
            ...state.resume,
            profile: {
              ...state.resume.profile,
              [field]: value,
            },
          },
        })),

      updateSettings: (field, value) =>
        set((state) => ({
          resume: {
            ...state.resume,
            settings: {
              ...state.resume.settings,
              [field]: value,
            },
          },
        })),

      addSectionItem: (sectionKey, item) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: {
              ...state.resume.sections,
              [sectionKey]: [...(state.resume.sections?.[sectionKey] || []), item],
            },
          },
        })),

      removeSectionItem: (sectionKey, id) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: {
              ...state.resume.sections,
              [sectionKey]: (state.resume.sections?.[sectionKey] || []).filter(
                (item) => item.id !== id
              ),
            },
          },
        })),

      updateSectionItem: (sectionKey, id, updates) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: {
              ...state.resume.sections,
              [sectionKey]: (state.resume.sections?.[sectionKey] || []).map(
                (item) => (item.id === id ? { ...item, ...updates } : item)
              ),
            },
          },
        })),

      reorderSection: (sectionKey, newOrder) =>
        set((state) => ({
          resume: {
            ...state.resume,
            sections: {
              ...state.resume.sections,
              [sectionKey]: newOrder,
            },
          },
        })),
      
      setViewMode: (mode) => set({ viewMode: mode }),

      resetToDefaults: () =>
        set({
          resume: initialResumeState,
        }),
    }), // This closes the object passed to 'set'
    {
      name: 'auracv-local-v1',
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  ) // This closes the 'persist' call
); // This closes the 'create' call
