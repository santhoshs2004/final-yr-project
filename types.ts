export enum View {
  HOME,
  ONBOARDING,
  DASHBOARD,
}

export interface QuizAnswer {
  question: string;
  answer: string;
}

export interface UserProfile {
  name: string;
  resumeText: string;
  interests: string[];
  skills: string[];
  quizAnswers: QuizAnswer[];
  githubUrl?: string;
  leetcodeUrl?: string;
}

export interface CareerRecommendation {
  jobTitle: string;
  matchPercentage: number;
  reasoning: string;
  requiredSkills: string[];
}

export interface MissingSkill {
    skill: string;
    importance: 'High' | 'Medium' | 'Low';
}

export interface SkillGapAnalysis {
  missingSkills: MissingSkill[];
  summary: string;
}

export interface Course {
    title: string;
    platform: string;
    url: string;
}

export interface LearningObjective {
    description: string;
    courses: Course[];
}

export interface LearningPathStep {
  duration: string;
  title: string;
  learningObjectives: LearningObjective[];
  project: string;
}

export interface LearningPath {
    path: LearningPathStep[];
    estimatedTimeToCompletion: string;
}


export interface FutureOutlook {
    fiveYearDemand: string;
    newSkillsOnTheRise: { skill: string; reason: string }[];
    automationRisk: {
        level: 'Low' | 'Medium' | 'High';
        percentage: number;
        commentary: string;
    };
    salaryTrend: {
        growthPercentage: number;
        commentary: string;
    }
}

export interface JobPosting {
    title: string;
    company: string;
    platform: 'LinkedIn' | 'Indeed' | 'Forage' | 'Other' | string;
    url: string;
    description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface Source {
    uri: string;
    title: string;
}

export interface AppState {
  view: View;
  userProfile: UserProfile | null;
  recommendations: CareerRecommendation[];
  selectedCareer: CareerRecommendation | null;
  skillGap: SkillGapAnalysis | null;
  learningPath: LearningPath | null;
  futureOutlook: FutureOutlook | null;
  jobPostings: JobPosting[] | null;
  sources: Source[] | null;
  isLoading: boolean;
  error: string | null;
  completedLearningSteps: number[];
}