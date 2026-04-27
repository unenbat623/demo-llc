import mongoose, { Schema, Document } from 'mongoose';

export interface ITeamMember extends Document {
  name: string;
  position: string;
  image: string;
  experience?: string;
  aboutMe?: string;
  skills: string[];
  projects: string[];
  education: string[];
  achievements: string[];
  social: {
    linkedin: string;
    email?: string;
  };
}

const TeamMemberSchema: Schema = new Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  image: { type: String, required: true },
  experience: { type: String },
  aboutMe: { type: String },
  skills: [{ type: String }],
  projects: [{ type: String }],
  education: [{ type: String }],
  achievements: [{ type: String }],
  social: {
    linkedin: { type: String, default: '#' },
    email: { type: String }
  }
}, { timestamps: true });

export default mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema);
