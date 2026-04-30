import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  role: 'admin' | 'staff' | 'client';
  roleName: string;
  permissions: string[];
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'staff', 'client'], default: 'admin' },
  roleName: { type: String, default: 'Admin' },
  permissions: { 
    type: [String], 
    default: ['dashboard', 'website', 'team', 'system', 'logs'] 
  }
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);
