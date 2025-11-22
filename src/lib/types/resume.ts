export interface ResumeProfile {
  name: string;
  email: string;
  phone: string;
  location: string;
  url: string;
  title: string;
  summary: string;
}

export interface ResumeExperience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  description: string; // Markdown or bullet points
}

export interface ResumeEducation {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  current: boolean;
  location: string;
  description: string;
}

export interface ResumeProject {
  id: string;
  name: string;
  description: string;
  url: string;
  technologies: string[];
  startDate: string;
  endDate: string;
}

export interface ResumeSkill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

export interface ResumeSection {
  experience: ResumeExperience[];
  education: ResumeEducation[];
  projects: ResumeProject[];
  skills: ResumeSkill[];
}

export type SectionItemType<K extends keyof ResumeSection> = K extends 'experience'
  ? ResumeExperience
  : K extends 'education'
  ? ResumeEducation
  : K extends 'skills'
  ? ResumeSkill
  : K extends 'projects'
  ? ResumeProject
  : never;

export type FontFamily = 'Helvetica' | 'Times-Roman' | 'Courier';
export type ThemeColor = 'modern' | 'classic' | 'minimalist';

export type DocumentSize = 'A4' | 'LETTER';

export interface ResumeSettings {
  fontFamily: FontFamily;
  theme: ThemeColor;
  accentColor: string;
  documentSize: DocumentSize;
}

export interface Resume {
  id: string;
  profile: ResumeProfile;
  sections: ResumeSection;
  settings: ResumeSettings;
}

export const initialResumeState: Resume = {
  id: 'default-resume',
  profile: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    url: 'linkedin.com/in/johndoe',
    title: 'Senior Software Engineer',
    summary: 'Experienced software engineer with a passion for building scalable web applications and distributed systems. Proven track record of delivering high-quality code and mentoring junior developers.',
  },
  sections: {
    experience: [
      {
        id: 'exp-1',
        company: 'Tech Corp Inc.',
        position: 'Senior Software Engineer',
        startDate: '2020-01',
        endDate: 'Present',
        current: true,
        location: 'San Francisco, CA',
        description: '• Led the migration of legacy monolith to microservices architecture.\n• Improved system performance by 40% through code optimization and caching strategies.\n• Mentored a team of 5 junior developers and conducted code reviews.',
      },
      {
        id: 'exp-2',
        company: 'Startup Solutions',
        position: 'Software Engineer',
        startDate: '2018-06',
        endDate: '2019-12',
        current: false,
        location: 'New York, NY',
        description: '• Developed and maintained key features for the company flagship product.\n• Collaborated with product managers and designers to define project requirements.\n• Implemented automated testing pipelines, increasing code coverage by 25%.',
      },
    ],
    education: [
      {
        id: 'edu-1',
        institution: 'University of Technology',
        degree: 'Bachelor of Science',
        fieldOfStudy: 'Computer Science',
        startDate: '2014-09',
        endDate: '2018-05',
        current: false,
        location: 'Boston, MA',
        description: 'Graduated with Honors. Member of the ACM Student Chapter.',
      },
    ],
    projects: [
      {
        id: 'proj-1',
        name: 'E-commerce Platform',
        description: 'A full-stack e-commerce application built with React, Node.js, and MongoDB.',
        url: 'github.com/johndoe/ecommerce',
        technologies: ['React', 'Node.js', 'MongoDB', 'Redux'],
        startDate: '2019-01',
        endDate: '2019-06',
      },
    ],
    skills: [
      { id: 'skill-1', name: 'JavaScript/TypeScript', level: 'Expert' },
      { id: 'skill-2', name: 'React', level: 'Expert' },
      { id: 'skill-3', name: 'Node.js', level: 'Advanced' },
      { id: 'skill-4', name: 'Python', level: 'Intermediate' },
      { id: 'skill-5', name: 'AWS', level: 'Intermediate' },
    ],
  },
  settings: {
    fontFamily: 'Helvetica',
    theme: 'modern',
    accentColor: '#000000',
    documentSize: 'LETTER',
  },
};
