import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Resume, PersonalInfo, Experience, Education, Skill, Project } from '../types';

const generateId = () => crypto.randomUUID();

interface ResumeState {
  resume: Resume;
  isHydrated: boolean;
  setPersonalInfo: (info: PersonalInfo) => void;
  setSummary: (summary: string) => void;
  
  addExperience: (experience: Omit<Experience, 'id'>) => void;
  updateExperience: (id: string, experience: Partial<Experience>) => void;
  removeExperience: (id: string) => void;
  reorderExperience: (startIndex: number, endIndex: number) => void;

  addEducation: (education: Omit<Education, 'id'>) => void;
  updateEducation: (id: string, education: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  reorderEducation: (startIndex: number, endIndex: number) => void;

  addSkill: (skill: Omit<Skill, 'id'>) => void;
  updateSkill: (id: string, skill: Partial<Skill>) => void;
  removeSkill: (id: string) => void;

  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  removeProject: (id: string) => void;
  
  resetResume: () => void;
}

const initialResume: Resume = {
  id: generateId(),
  title: 'My Resume',
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

export const useResumeStore = create<ResumeState>()(
  persist(
    (set) => ({
      resume: initialResume,
      isHydrated: false,
      
      setPersonalInfo: (info) => set((state) => ({
        resume: { ...state.resume, personalInfo: info, updatedAt: Date.now() }
      })),
      
      setSummary: (summary) => set((state) => ({
        resume: { ...state.resume, summary, updatedAt: Date.now() }
      })),

      addExperience: (experience) => set((state) => ({
        resume: {
          ...state.resume,
          experience: [...state.resume.experience, { ...experience, id: generateId() }],
          updatedAt: Date.now()
        }
      })),
      
      updateExperience: (id, experience) => set((state) => ({
        resume: {
          ...state.resume,
          experience: state.resume.experience.map((exp) => 
            exp.id === id ? { ...exp, ...experience } : exp
          ),
          updatedAt: Date.now()
        }
      })),
      
      removeExperience: (id) => set((state) => ({
        resume: {
          ...state.resume,
          experience: state.resume.experience.filter((exp) => exp.id !== id),
          updatedAt: Date.now()
        }
      })),

      reorderExperience: (startIndex, endIndex) => set((state) => {
        const result = Array.from(state.resume.experience);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return { resume: { ...state.resume, experience: result, updatedAt: Date.now() } };
      }),

      addEducation: (education) => set((state) => ({
        resume: {
          ...state.resume,
          education: [...state.resume.education, { ...education, id: generateId() }],
          updatedAt: Date.now()
        }
      })),
      
      updateEducation: (id, education) => set((state) => ({
        resume: {
          ...state.resume,
          education: state.resume.education.map((edu) => 
            edu.id === id ? { ...edu, ...education } : edu
          ),
          updatedAt: Date.now()
        }
      })),
      
      removeEducation: (id) => set((state) => ({
        resume: {
          ...state.resume,
          education: state.resume.education.filter((edu) => edu.id !== id),
          updatedAt: Date.now()
        }
      })),

      reorderEducation: (startIndex, endIndex) => set((state) => {
        const result = Array.from(state.resume.education);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return { resume: { ...state.resume, education: result, updatedAt: Date.now() } };
      }),

      addSkill: (skill) => set((state) => ({
        resume: {
          ...state.resume,
          skills: [...state.resume.skills, { ...skill, id: generateId() }],
          updatedAt: Date.now()
        }
      })),
      
      updateSkill: (id, skill) => set((state) => ({
        resume: {
          ...state.resume,
          skills: state.resume.skills.map((s) => 
            s.id === id ? { ...s, ...skill } : s
          ),
          updatedAt: Date.now()
        }
      })),
      
      removeSkill: (id) => set((state) => ({
        resume: {
          ...state.resume,
          skills: state.resume.skills.filter((s) => s.id !== id),
          updatedAt: Date.now()
        }
      })),

      addProject: (project) => set((state) => ({
        resume: {
          ...state.resume,
          projects: [...state.resume.projects, { ...project, id: generateId() }],
          updatedAt: Date.now()
        }
      })),
      
      updateProject: (id, project) => set((state) => ({
        resume: {
          ...state.resume,
          projects: state.resume.projects.map((p) => 
            p.id === id ? { ...p, ...project } : p
          ),
          updatedAt: Date.now()
        }
      })),
      
      removeProject: (id) => set((state) => ({
        resume: {
          ...state.resume,
          projects: state.resume.projects.filter((p) => p.id !== id),
          updatedAt: Date.now()
        }
      })),

      resetResume: () => set({ resume: initialResume }),
    }),
    {
      name: 'resume-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.isHydrated = true;
        }
      },
    }
  )
);
