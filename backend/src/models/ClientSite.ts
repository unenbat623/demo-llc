import mongoose, { Schema, Document } from 'mongoose';

export interface IClientSite extends Document {
  owner: mongoose.Types.ObjectId;   // links to User._id
  siteName: string;
  settings: Record<string, any>;    // same shape as main Settings
  teamMembers: any[];               // embedded team for this client
  createdAt: Date;
  updatedAt: Date;
}

const ClientSiteSchema: Schema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  siteName: { type: String, default: 'My Website' },
  settings: { type: Schema.Types.Mixed, default: {} },
  teamMembers: { type: [Schema.Types.Mixed], default: [] },
}, { timestamps: true });

export default mongoose.model<IClientSite>('ClientSite', ClientSiteSchema);
