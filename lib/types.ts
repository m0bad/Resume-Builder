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
  technicalSkills: Array<{
    name: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  }>;
  employments: Array<{
    jobTitle: string;
    companyName: string;
    startDate: string;
    endDate?: string;
    currentlyEmployed: boolean;
    description: string;
  }>;
  educations: Array<{
    schoolName: string;
    degree: string;
    startYear: number;
    endYear: number;
  }>;
  certificates: Array<{
    name: string;
    month: number;
    year: number;
    description: string;
  }>;
  languages: Array<{
    name: string;
    proficiency: 'Basic' | 'Conversational' | 'Fluent' | 'Native';
  }>;
}

