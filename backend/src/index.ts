import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import TeamMember from './models/TeamMember';
import Log from './models/Log';
import User from './models/User';
import Settings from './models/Settings';
import { generateRandomTeamMember } from './utils/generator';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tavan_bogd_tech';

app.use(cors());
app.use(express.json());

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ── Settings ──────────────────────────────────────────────────
app.get('/api/settings', async (req: Request, res: Response) => {
  try {
    const settings = await Settings.findOne() || await Settings.create({});
    res.json(settings);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/api/settings', async (req: Request, res: Response) => {
  try {
    const settings = await Settings.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(settings);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// ── Team ──────────────────────────────────────────────────────
app.get('/api/team', async (req: Request, res: Response) => {
  try {
    const members = await TeamMember.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/team', async (req: Request, res: Response) => {
  try {
    const member = new TeamMember(req.body);
    res.status(201).json(await member.save());
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/team/:id', async (req: Request, res: Response) => {
  try {
    const updated = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Team member not found' });
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/team/:id', async (req: Request, res: Response) => {
  try {
    const deleted = await TeamMember.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Team member not found' });
    res.json({ message: 'Team member deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/team/seed', async (req: Request, res: Response) => {
  try {
    if (await TeamMember.countDocuments() > 0)
      return res.status(400).json({ message: 'Database already seeded' });
    res.status(201).json(await TeamMember.insertMany(req.body));
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/team/generate', async (req: Request, res: Response) => {
  try {
    const { count = 5 } = req.body;
    if (count < 1 || count > 50)
      return res.status(400).json({ message: 'Count must be between 1 and 50' });

    const generated = Array.from({ length: count }, generateRandomTeamMember);
    const saved = await TeamMember.insertMany(generated);
    res.status(201).json({ message: `${count} team members generated`, members: saved });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// ── Logs ──────────────────────────────────────────────────────
app.get('/api/logs', async (req: Request, res: Response) => {
  try {
    res.json(await Log.find().sort({ createdAt: -1 }));
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/logs', async (req: Request, res: Response) => {
  try {
    res.status(201).json(await new Log(req.body).save());
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/logs', async (req: Request, res: Response) => {
  try {
    await Log.deleteMany({});
    res.json({ message: 'All logs deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/api/logs/:id', async (req: Request, res: Response) => {
  try {
    const deleted = await Log.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Log not found' });
    res.json({ message: 'Log deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// ── Auth ──────────────────────────────────────────────────────
app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: 'Username and password are required' });

    const user = await User.findOne({ username });
    if (!user || user.password !== password)
      return res.status(401).json({ message: 'Invalid username or password' });

    res.json({ message: 'Login successful', user: { username: user.username, role: user.role, id: user._id } });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

app.put('/api/auth/profile', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne();
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (username) user.username = username;
    if (password) user.password = password;
    await user.save();
    res.json({ message: 'Profile updated' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// ── Users ─────────────────────────────────────────────────────
app.get('/api/users', async (req: Request, res: Response) => {
  try {
    res.json(await User.find({}, '-password').sort({ createdAt: -1 }));
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/users', async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;
    if (await User.findOne({ username }))
      return res.status(400).json({ message: 'Username already exists' });

    const user = await new User({ username, password, role }).save();
    res.status(201).json({ message: 'User created', user: { username: user.username, role: user.role, id: user._id } });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

app.put('/api/users/:id', async (req: Request, res: Response) => {
  try {
    const { username, password, role } = req.body;
    const updateData: Record<string, string> = {};
    if (username) updateData.username = username;
    if (password) updateData.password = password;
    if (role) updateData.role = role;

    const user = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User updated', user: { username: user.username, role: user.role, id: user._id } });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

app.delete('/api/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// ── Seed default users & start ────────────────────────────────
const seedUsers = async () => {
  try {
    if (!await User.countDocuments({ username: 'admin' }))
      await User.create({ username: 'admin', password: 'admin', role: 'admin' });
    if (!await User.countDocuments({ username: 'staff' }))
      await User.create({ username: 'staff', password: 'staff', role: 'staff' });
  } catch (err: any) {
    console.error('Error seeding users:', err.message);
  }
};

app.listen(PORT, async () => {
  await seedUsers();
  console.log(`🚀 Server running on port ${PORT}`);
});
