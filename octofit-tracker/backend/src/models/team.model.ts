import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  members: Types.ObjectId[];
  createdAt: Date;
  goals: string[];
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: () => new Date() },
  goals: { type: [String], default: [] },
});

export const Team = mongoose.model<ITeam>('Team', teamSchema);
