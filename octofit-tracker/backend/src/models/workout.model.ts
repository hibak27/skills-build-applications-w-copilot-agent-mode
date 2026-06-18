import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  recommendedFor: Types.ObjectId[];
}

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, required: true, default: 'beginner' },
  durationMinutes: { type: Number, required: true },
  recommendedFor: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
