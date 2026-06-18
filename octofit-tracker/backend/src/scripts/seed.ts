import mongoose from 'mongoose';
import { User } from '../models/user.model.js';
import { Team } from '../models/team.model.js';
import { Activity } from '../models/activity.model.js';
import { LeaderboardEntry } from '../models/leaderboard.model.js';
import { Workout } from '../models/workout.model.js';

const mongoUri = 'mongodb://127.0.0.1:27017/octofit_db';

async function seed() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB for seeding:', mongoUri);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.create([
    { name: 'Ava Carter', email: 'ava@example.com', passwordHash: 'hash1', role: 'user' },
    { name: 'Noah Patel', email: 'noah@example.com', passwordHash: 'hash2', role: 'coach' },
    { name: 'Mia Johnson', email: 'mia@example.com', passwordHash: 'hash3', role: 'user' },
  ]);

  const teams = await Team.create([
    { name: 'Sunrise Sprinters', members: [users[0]._id, users[2]._id], goals: ['complete 5k', 'boost recovery'] },
    { name: 'Wellness Warriors', members: [users[1]._id], goals: ['strength building', 'team wellness'] },
  ]);

  await Activity.create([
    { user: users[0]._id, type: 'Cycling', durationMinutes: 45, caloriesBurned: 420, performedAt: new Date(Date.now() - 1000 * 60 * 60 * 24) },
    { user: users[2]._id, type: 'Yoga', durationMinutes: 60, caloriesBurned: 220, performedAt: new Date(Date.now() - 1000 * 60 * 60 * 48) },
    { user: users[0]._id, type: 'Running', durationMinutes: 30, caloriesBurned: 360, performedAt: new Date(Date.now() - 1000 * 60 * 60 * 72) },
  ]);

  await LeaderboardEntry.create([
    { user: users[0]._id, team: teams[0]._id, points: 1420, rank: 1, season: 'Spring 2026' },
    { user: users[2]._id, team: teams[0]._id, points: 1100, rank: 2, season: 'Spring 2026' },
    { user: users[1]._id, team: teams[1]._id, points: 980, rank: 3, season: 'Spring 2026' },
  ]);

  await Workout.create([
    { title: 'Morning HIIT', description: '30-minute interval circuit for strength and endurance.', difficulty: 'intermediate', durationMinutes: 30, recommendedFor: [users[0]._id, users[2]._id] },
    { title: 'Recovery Flow', description: 'A gentle mobility routine to support recovery and flexibility.', difficulty: 'beginner', durationMinutes: 20, recommendedFor: [users[0]._id, users[1]._id] },
    { title: 'Endurance Builder', description: 'A longer steady-state workout for stamina and pacing.', difficulty: 'advanced', durationMinutes: 55, recommendedFor: [users[2]._id] },
  ]);

  console.log('Seeding complete');
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
