import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  user: Types.ObjectId;
  team?: Types.ObjectId;
  points: number;
  rank: number;
  season: string;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  points: { type: Number, required: true, default: 0 },
  rank: { type: Number, required: true },
  season: { type: String, required: true },
});

export const LeaderboardEntry = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
