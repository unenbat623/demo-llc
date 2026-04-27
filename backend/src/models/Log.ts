import mongoose, { Schema, Document } from 'mongoose';

export interface ILog extends Document {
  username: string;
  position: string;
  action: string;
  description: string;
  createdAt: Date;
}

const LogSchema: Schema = new Schema({
  username: { type: String, required: true },
  position: { type: String, required: true },
  action: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<ILog>('Log', LogSchema);
