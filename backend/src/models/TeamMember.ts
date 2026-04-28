import mongoose, { Schema, Document } from 'mongoose';

export interface ITeamMember extends Document {
  name: string;
  name_en?: string;
  position: string;
  position_en?: string;
  image: string;
  experience?: string;
  experience_en?: string;
  aboutMe?: string;
  aboutMe_en?: string;
  skills: string[];
  projects: string[];
  projects_en?: string[];
  education: string[];
  education_en?: string[];
  achievements: string[];
  achievements_en?: string[];
  social: {
    linkedin: string;
    email?: string;
  };
}

const TeamMemberSchema: Schema = new Schema({
  name: { type: String, required: true },
  name_en: { type: String },
  position: { type: String, required: true },
  position_en: { type: String },
  image: { type: String, required: true },
  experience: { type: String },
  experience_en: { type: String },
  aboutMe: { type: String },
  aboutMe_en: { type: String },
  skills: [{ type: String }],
  projects: [{ type: String }],
  projects_en: [{ type: String }],
  education: [{ type: String }],
  education_en: [{ type: String }],
  achievements: [{ type: String }],
  achievements_en: [{ type: String }],
  social: {
    linkedin: { type: String, default: '#' },
    email: { type: String }
  }
}, { timestamps: true });

export default mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema);
