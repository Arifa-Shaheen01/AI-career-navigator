export interface UserProfile {
  name: string;
  education: string;
  stream: string;
  skills: string[];
  aspirations: string[];
}

export interface PathwayStep {
  step: number;
  programName: string;
  nsqfLevel: number;
  duration: string;
  mode: 'Online' | 'Offline' | 'Hybrid';
  completed: boolean;
}

export interface Program {
  id: string;
  name: string;
  nsqf: number;
  provider: string;
  duration: string;
  description: string;
  learningOutcomes: string[];
  potentialJobs: string[];
}

export type Page = 'landing' | 'onboarding' | 'dashboard' | 'admin' | 'admin_login' | 'auth' | 'blog' | 'program_details';