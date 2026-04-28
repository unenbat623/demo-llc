export interface TeamMember {
  id: string;
  name: string;
  name_en?: string;
  position: string;
  position_en?: string;
  image: string;
  experience: string;
  experience_en?: string;
  aboutMe: string;
  aboutMe_en?: string;
  skills: string[];
  projects: string[];
  projects_en?: string[];
  education: string[];
  education_en?: string[];
  achievements: string[];
  achievements_en?: string[];
  social: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}
