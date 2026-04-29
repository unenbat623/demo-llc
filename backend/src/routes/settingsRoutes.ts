import { Router, Request, Response } from 'express';
import Settings from '../models/Settings';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const settings = await Settings.findOne() || await Settings.create({});
    res.json(settings);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const settings = await Settings.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(settings);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/', async (req: Request, res: Response) => {
  try {
    const settings = await Settings.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(settings);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
