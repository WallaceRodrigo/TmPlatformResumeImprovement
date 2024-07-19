export interface Account {
  id: number;
  externalId: string;
  fullName: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  createdAt: string;
  createdBy: string;
  lastUpdatedAt: string;
  lastUpdatedBy: string;
}

export interface Location {
  id: number;
  externalId: string;
  locationName: string;
  region: number;
  createdAt: string;
  lastUpdatedAt: string;
}

export interface AboutMe {
  id: number | null;
  externalId: string | null;
  fullDescription: string;
  createdAt: string | null;
  lastUpdatedAt: string | null;
}

export enum TechnologyTag {
  ProgrammingLanguage,
  Database,
  Framework,
  DevOpsTool,
  CloudService,
  DataScienceTool,
  MachineLearning,
  SecurityTool,
  WebDevelopment,
  MobileDevelopment,
  GameDevelopment,
  EmbeddedSystems,
  Networking,
  TestingTool,
  AgileMethodology,
  ProjectManagement,
  VersionControl,
  UIUX,
  Other,
}

export interface Technology {
  id: number;
  name: string;
  externalId: string;
  tag: TechnologyTag;
  createdAt: string;
  lastUpdatedAt: string;
}

export interface ResumeTechnology {
  resumeId: number;
  technologyId: number;
  technology: Technology;
  createdAt: string;
  lastUpdatedAt: string;
}

export interface ExperienceTechnology {
  experienceId: number;
  technologyId: number;
  technology: Technology;
  createdAt: string;
  lastUpdatedAt: string;
}

export interface ExperienceContext {
  id: number;
  externalId: string;
  fullDescription: string;
  createdAt: string;
  lastUpdatedAt: string;
}

export interface Experience {
  id: number;
  externalId: string;
  title: string;
  employmentType: number;
  companyName: string;
  location: Location;
  locationType: number;
  currentJob: boolean;
  startDate: string;
  endDate?: string;
  experienceDuration: string;
  description: string;
  achievements: Achievement[];
  experienceTechnology: ExperienceTechnology[];
  context: ExperienceContext;
  createdAt: string;
  lastUpdatedAt: string;
}

export interface Achievement {
  id: number;
  externalId: string;
  fullDescription: string;
  experience: Experience;
  createdAt: string;
  lastUpdatedAt: string;
}

export interface Education {
  id: number;
  externalId: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  currentlyStudying: boolean;
  description: string;
  educationTechnology: any[];
  createdAt: string;
  lastUpdatedAt: string;
}

export interface Languages {
  id: number,
  externalId: string,
  languageName: string,
  proeficiency: Proficiency,
  createdAt: string,
  createdBy: null | string,
  lastUpdatedAt: string,
  lastUpdatedBy: null | string
}

export interface Resume {
  resume: AboutMe;
  id: number;
  externalId: string;
  name: string;
  email: string;
  linkedinUrl: string;
  personalSite: string;
  headLine: string[];
  account: Account;
  location: Location;
  aboutMe: AboutMe[];
  resumeTechnology: ResumeTechnology[];
  experiences: Experience[];
  education: Education[];
  languages: Languages[];
  createdAt: string;
  lastUpdatedAt: string;
}

export enum Region {
  Latam,
  Usa,
  Europe,
  Other
}

export enum Proficiency {
  Native,
  Advanced,
  Intermediate,
  Basic
}

// export interface Resume {
//   id: number;
//   externalId: string;
//   name: string;
//   email: string;
//   linkedinUrl: string;
//   personalSite: string;
//   headLine: HeadLine;
//   account: Account;
//   location: Location;
//   aboutMe: AboutMe;
//   resumeTechnology: ResumeTechnology;
//   experiences: Experience;
//   education: Education;
//   projects: any; // ajustar conforme necessário
//   volunteering: any; // ajustar conforme necessário
//   publications: any; // ajustar conforme necessário
//   languages: Languages; // ajustar conforme necessário
//   talks: any; // ajustar conforme necessário
//   certifications: any; // ajustar conforme necessário
//   createdAt: string;
//   createdBy: string | null;
//   lastUpdatedAt: string;
//   lastUpdatedBy: string | null;
// }

// export interface HeadLine {
//   $id: string;
//   $values: string[];
// }

// export enum Proficiency {
//   Native,
//   Advanced,
//   Intermediate,
//   Basic
// }

// export interface Account {
//   id: number;
//   externalId: string;
//   fullName: string;
//   firstName: string;
//   lastName: string;
//   username: string;
//   password: string;
//   email: string;
//   phone: string;
//   createdAt: string;
//   createdBy: string;
//   lastUpdatedAt: string;
//   lastUpdatedBy: string;
// }

// export enum Region {
//   Latam,
//   Usa,
//   Europe,
//   Other
// }

// export interface Location {
//   id: number;
//   externalId: string;
//   locationName: string;
//   region: Region;
//   createdAt: string;
//   createdBy: string | null;
//   lastUpdatedAt: string;
//   lastUpdatedBy: string | null;
// }

// export interface AboutMe {
//   id: number;
//   externalId: string;
//   fullDescription: string;
//   createdAt: string;
//   createdBy: string | null;
//   lastUpdatedAt: string;
//   lastUpdatedBy: string | null;
// }

// export interface ResumeTechnology {
//   $id: string;
//   $values: {
//     resumeId: number;
//     resume: {
//       $ref: string;
//     };
//     technologyId: number;
//     technology: Technology;
//     createdAt: string;
//     createdBy: string | null;
//     lastUpdatedAt: string;
//     lastUpdatedBy: string | null;
//   }[];
// }

// export interface Technology {
//   $id: string;
//   id: number;
//   name: string;
//   externalId: string;
//   tag: string;
//   frameworks: any; // ajustar conforme necessário
//   createdAt: string;
//   createdBy: string | null;
//   lastUpdatedAt: string;
//   lastUpdatedBy: string | null;
// }

// export interface Experience {
//   $id: string;
//   $values: {
//     id: number;
//     externalId: string;
//     title: string;
//     employmentType: number;
//     companyName: string;
//     location: Location | null;
//     locationType: number;
//     currentJob: boolean;
//     startDate: string;
//     endDate: string;
//     experienceDuration: string;
//     description: string;
//     achievements: Achievements;
//     experienceTechnology: ExperienceTechnology;
//     context: Context;
//     activities: any; // ajustar conforme necessário
//     createdAt: string;
//     createdBy: string | null;
//     lastUpdatedAt: string;
//     lastUpdatedBy: string | null;
//   }[]
// }

// export interface Achievements {
//   $id: string;
//   $values: {
//     $id: string,
//     id: number,
//     externalId: string,
//     fullDescription: string,
//     experience: {
//       $ref: string;
//     },
//     createdAt: string,
//     createdBy: null | string,
//     lastUpdatedAt: string,
//     lastUpdatedBy: null | string
//   }[];
// }

// export interface ExperienceTechnology {
//   $id: string;
//   $values: {
//     experienceId: number;
//     experience: {
//       $ref: string;
//     };
//     technologyId: number;
//     technology: Technology;
//     createdAt: string;
//     createdBy: string | null;
//     lastUpdatedAt: string;
//     lastUpdatedBy: string | null;
//   }[];
// }

// export interface Context {
//   $id: string;
//   id: number;
//   externalId: string;
//   fullDescription: string;
//   createdAt: string;
//   createdBy: string | null;
//   lastUpdatedAt: string;
//   lastUpdatedBy: string | null;
// }

// export interface Education {
//   $id: string;
//   $values: {
//     id: number;
//     externalId: string;
//     school: string;
//     degree: string;
//     fieldOfStudy: string;
//     startDate: string;
//     endDate: string;
//     currentlyStudying: boolean;
//     description: string;
//     educationTechnology: EducationTechnology;
//     createdAt: string;
//     createdBy: string | null;
//     lastUpdatedAt: string;
//     lastUpdatedBy: string | null;
//   }[]
// }

// export interface EducationTechnology {
//   $id: string;
//   $values: {
//     experienceId: number;
//     experience: {
//       $ref: string;
//     };
//     technologyId: number;
//     technology: Technology;
//     createdAt: string;
//     createdBy: string | null;
//     lastUpdatedAt: string;
//     lastUpdatedBy: string | null;
//   }[];
// }
