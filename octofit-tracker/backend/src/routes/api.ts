import { Router } from 'express';
import { User } from '../models/user.model.js';
import { Team } from '../models/team.model.js';
import { Activity } from '../models/activity.model.js';
import { LeaderboardEntry } from '../models/leaderboard.model.js';
import { Workout } from '../models/workout.model.js';

const router = Router();

router.get('/users', async (req, res) => {
  const users = await User.find().select('-passwordHash').lean();
  res.json({ message: 'Users endpoint', data: users });
});

router.get('/teams', async (req, res) => {
  const teams = await Team.find().populate('members', 'name email role').lean();
  res.json({ message: 'Teams endpoint', data: teams });
});

router.get('/activities', async (req, res) => {
  const activities = await Activity.find().populate('user', 'name email').lean();
  res.json({ message: 'Activities endpoint', data: activities });
});

router.get('/leaderboard', async (req, res) => {
  const leaderboard = await LeaderboardEntry.find()
    .populate('user', 'name email')
    .populate('team', 'name')
    .sort({ rank: 1 })
    .lean();
  res.json({ message: 'Leaderboard endpoint', data: leaderboard });
});

router.get('/workouts', async (req, res) => {
  const workouts = await Workout.find().populate('recommendedFor', 'name email').lean();
  res.json({ message: 'Workouts endpoint', data: workouts });
});

export default router;
