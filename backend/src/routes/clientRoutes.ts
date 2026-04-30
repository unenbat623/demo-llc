import { Router, Request, Response } from 'express';
import ClientSite from '../models/ClientSite';
import mongoose from 'mongoose';

const router = Router();

// ── GET own site ─────────────────────────────────────────────
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(400).json({ message: 'Invalid user ID' });

    let site = await ClientSite.findOne({ owner: userId });
    if (!site) {
      // Auto-create on first access
      site = await ClientSite.create({ owner: userId, siteName: 'My Website', settings: {}, teamMembers: [] });
    }
    res.json(site);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// ── UPDATE site settings ─────────────────────────────────────
router.put('/:userId/settings', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const site = await ClientSite.findOneAndUpdate(
      { owner: userId },
      { $set: { settings: req.body, updatedAt: new Date() } },
      { new: true, upsert: true }
    );
    res.json(site);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// ── GET team members ─────────────────────────────────────────
router.get('/:userId/team', async (req: Request, res: Response) => {
  try {
    const site = await ClientSite.findOne({ owner: req.params.userId });
    res.json(site?.teamMembers || []);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// ── ADD team member ──────────────────────────────────────────
router.post('/:userId/team', async (req: Request, res: Response) => {
  try {
    const member = { ...req.body, _id: new mongoose.Types.ObjectId().toHexString(), createdAt: new Date() };
    const site = await ClientSite.findOneAndUpdate(
      { owner: req.params.userId },
      { $push: { teamMembers: member } },
      { new: true, upsert: true }
    );
    res.status(201).json(member);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// ── UPDATE team member ───────────────────────────────────────
router.put('/:userId/team/:memberId', async (req: Request, res: Response) => {
  try {
    const { userId, memberId } = req.params;
    await ClientSite.findOneAndUpdate(
      { owner: userId, 'teamMembers._id': memberId },
      { $set: { 'teamMembers.$': { ...req.body, _id: memberId } } }
    );
    res.json({ message: 'Updated' });
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

// ── DELETE team member ───────────────────────────────────────
router.delete('/:userId/team/:memberId', async (req: Request, res: Response) => {
  try {
    const { userId, memberId } = req.params;
    await ClientSite.findOneAndUpdate(
      { owner: userId },
      { $pull: { teamMembers: { _id: memberId } } }
    );
    res.json({ message: 'Deleted' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
