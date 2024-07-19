import { Education, Experience, Resume, Technology } from "./ResumeType";

export interface ImproveResumeResponse {
  resume: Resume;
  headline: HeadlineRecommendations;
  experiences: ExperienceRecommendations;
  aboutMe: AboutMeRecommendations;
  educations: EducationRecommendations;
  skillSummary: SkillSummaryRecommendations;
}

export interface SkillSummaryRecommendations {
  recommendations: string[];
  technologies: Technology[];
}

export interface TechnologySuggestion {
  id: number;
  name: string;
  externalId: string;
}

export interface HeadlineRecommendations {
  oldHeadLine: string;
  newHeadLine: string;
  suggestedHeadLines: string[];
  recommendations: string[];
  suggestedTechnologies: TechnologySuggestion[];
}

export interface AboutMeRecommendations {
  description: string;
  recommendations: string[];
  suggestedTechnologies: TechnologySuggestion[];
  technologies: TechnologySuggestion[];
}

export interface achievementsRecommendations {
  achievementRecommendations: string[];
  externalId: string;
  fullDescription: string;
}

export interface suggestedAchievements {
  achievement: string;
  createdAt: string;
  id: string;
  lastUpdatedAt: string;
  type: number;
}

export interface suggestedVerbs {
  value: string;
  createdAt: string;
  id: string;
  lastUpdatedAt: string;
  verbType: number;
}

export interface ExperienceRecommendations {
  recommendations: string[];
  newExperiences: { 
    experience: Experience;
    achievements: Achievements
    recommendations: string[];
    suggestedTechnologies: TechnologySuggestion[];
    technologies: TechnologySuggestion[];
   }[];
  oldExperiences: Experience[];
}

export interface Achievements {
  achievements: achievementsRecommendations[];
  recommendations: string[];
  suggestedAchievements: suggestedAchievements[];
  suggestedVerbs: suggestedVerbs[];
}

export interface EducationRecommendations {
  recommendations: string[];
  newEducation: { recommendations: string[]; education: Education }[];
  oldEducations: Education[];
}