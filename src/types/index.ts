export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image: string;
  experience: string;
  aboutMe: string;
  skills: string[];
  projects: string[];
  education: string[];
  achievements: string[];
  social: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}
