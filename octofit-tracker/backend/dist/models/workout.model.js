import mongoose, { Schema } from 'mongoose';
const workoutSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, required: true, default: 'beginner' },
    durationMinutes: { type: Number, required: true },
    recommendedFor: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});
export const Workout = mongoose.model('Workout', workoutSchema);
