import { Router, Request, Response } from 'express';
import ClientSite from '../models/ClientSite';
import mongoose from 'mongoose';
import { translateToEnglish } from './translateRoutes';

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
    const data = req.body;
    const member = {
      ...data,
      _id: new mongoose.Types.ObjectId().toHexString(),
      createdAt: new Date(),
      name_en: data.name_en || await translateToEnglish(data.name),
      position_en: data.position_en || await translateToEnglish(data.position),
      aboutMe_en: data.aboutMe_en || await translateToEnglish(data.aboutMe),
      experience_en: data.experience_en || await translateToEnglish(data.experience),
    };

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
    const data = req.body;
    
    // Auto-translate if _en fields are missing
    if (data.name && !data.name_en) data.name_en = await translateToEnglish(data.name);
    if (data.position && !data.position_en) data.position_en = await translateToEnglish(data.position);
    if (data.aboutMe && !data.aboutMe_en) data.aboutMe_en = await translateToEnglish(data.aboutMe);
    if (data.experience && !data.experience_en) data.experience_en = await translateToEnglish(data.experience);

    const site = await ClientSite.findOneAndUpdate(
      { owner: userId, 'teamMembers._id': memberId },
      { $set: { 'teamMembers.$': { ...data, _id: memberId } } },
      { new: true }
    );
    res.json(site);
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

// ── BULK DELETE team members ─────────────────────────────────
router.post('/:userId/team/bulk-delete', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { ids } = req.body;
    await ClientSite.findOneAndUpdate(
      { owner: userId },
      { $pull: { teamMembers: { _id: { $in: ids } } } }
    );
    res.json({ message: 'Bulk Deleted' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// ── BULK IMPORT team members ─────────────────────────────────
router.post('/:userId/team/bulk-import', async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const members = req.body;
    if (!Array.isArray(members))
      return res.status(400).json({ message: 'Data must be an array' });

    const formattedData = await Promise.all(members.map(async (item: any) => {
      const skills = typeof item.skills === 'string' ? item.skills.split(',').map((s: string) => s.trim()).filter(Boolean) : (item.skills || []);
      const education = typeof item.education === 'string' ? item.education.split(',').map((s: string) => s.trim()).filter(Boolean) : (item.education || []);
      const projects = typeof item.projects === 'string' ? item.projects.split(',').map((s: string) => s.trim()).filter(Boolean) : (item.projects || []);
      const achievements = typeof item.achievements === 'string' ? item.achievements.split(',').map((s: string) => s.trim()).filter(Boolean) : (item.achievements || []);

      return {
        ...item,
        _id: new mongoose.Types.ObjectId().toHexString(),
        createdAt: new Date(),
        social: { email: item.email, linkedin: item.linkedin || '#' },
        skills,
        education,
        projects,
        achievements,
        // Auto-translate if _en fields are missing
        name_en: item.name_en || await translateToEnglish(item.name),
        position_en: item.position_en || await translateToEnglish(item.position),
        aboutMe_en: item.aboutMe_en || await translateToEnglish(item.aboutMe),
        experience_en: item.experience_en || await translateToEnglish(item.experience),
        skills_en: item.skills_en || skills.join(', '), // Skills usually names, so just keep them
        education_en: item.education_en || await Promise.all(education.map((e: string) => translateToEnglish(e))),
        projects_en: item.projects_en || await Promise.all(projects.map((p: string) => translateToEnglish(p))),
        achievements_en: item.achievements_en || await Promise.all(achievements.map((a: string) => translateToEnglish(a))),
      };
    }));

    await ClientSite.findOneAndUpdate(
      { owner: userId },
      { $push: { teamMembers: { $each: formattedData } } },
      { new: true, upsert: true }
    );

    res.status(201).json({ success: true, count: formattedData.length });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
