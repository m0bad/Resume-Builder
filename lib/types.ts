export interface Certificate {
  name: string;
  month: number;
  year: number;
  description: string;
}

export interface Education {
  schoolName: string;
  degree: string;
  startYear: number;
  endYear: number;
}

export interface Employment {
  jobTitle: string;
  companyName: string;
  startDate: string;
  endDate?: string;
  currentlyEmployed: boolean;
  description: string;
}

export interface Language {
  name: string;
  proficiency: "Basic" | "Conversational" | "Fluent" | "Native";
}

export interface Skill {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
}

export interface ResumeData {
  personalDetails: {
    name: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    address: string;
    jobTitle: string;
    summary: string;
  };
  certificates: Certificate[];
  educations: Education[];
  employments: Employment[];
  languages: Language[];
  technicalSkills: Skill[];
}
