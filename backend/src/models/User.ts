import mongoose, { Schema, Document } from 'mongoose';

export enum UserRole {
  ADMIN = 'admin',
  STAFF = 'staff'
}

export interface IUser extends Document {
  username: string;
  password: string;
  role: UserRole;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: Object.values(UserRole), default: UserRole.STAFF }
}, { timestamps: true });

export default mongoose.model<IUser>('User', UserSchema);
