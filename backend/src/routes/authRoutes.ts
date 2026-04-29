import { Router, Request, Response } from 'express';
import User from '../models/User';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
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

router.put('/profile', async (req: Request, res: Response) => {
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

export default router;
