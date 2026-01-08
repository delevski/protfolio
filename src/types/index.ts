export interface Skill {
  name: string;
  description: string;
  usage: string;
  category: string;
}

export interface SkillCategory {
  category: string;
  skills: Omit<Skill, "category">[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  googlePlayUrl?: string;
  category: 'fintech' | 'mobile' | 'ai' | 'web' | 'automation';
}

export interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
  techStack: string[];
}

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  summary: string;
}

// AI News types
export interface AINews {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  sourceUrl: string;
  imageUrl?: string;
  category: string;
  tags: string[];
  createdAt: number;
}

export interface AINewsInput {
  title: string;
  summary: string;
  content: string;
  date: string;
  sourceUrl: string;
  imageUrl?: string;
  category: string;
  tags: string[];
}
