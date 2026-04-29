import { Router, Request, Response } from 'express';
import TeamMember from '../models/TeamMember';


const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const members = await TeamMember.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const member = new TeamMember(req.body);
    res.status(201).json(await member.save());
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updated = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Team member not found' });
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deleted = await TeamMember.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Team member not found' });
    res.json({ message: 'Team member deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});





router.post('/bulk-delete', async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0)
      return res.status(400).json({ message: 'ids must be a non-empty array' });
    const result = await TeamMember.deleteMany({ _id: { $in: ids } });
    res.json({ success: true, deleted: result.deletedCount });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/bulk-import', async (req: Request, res: Response) => {
  try {
    const members = req.body;
    if (!Array.isArray(members))
      return res.status(400).json({ message: 'Data must be an array' });

    const formattedData = members.map((item: any) => {
      let finalImage = item.image;

      if (!finalImage || (typeof finalImage === 'string' && !finalImage.startsWith('http') && !finalImage.startsWith('data:image'))) {
        const prompt = encodeURIComponent(`professional studio headshot portrait of ${item.name || 'a person'}, ${item.position || 'professional'}, wearing professional business attire, neutral background, cinematic lighting, highly detailed, 8k, realistic skin textures, sharp focus`);
        finalImage = `https://image.pollinations.ai/prompt/${prompt}?width=1440&height=2160&seed=${Math.floor(Math.random() * 999999)}&model=flux&nologo=true`;
      } else if (typeof finalImage === 'string' && finalImage.includes('image.pollinations.ai')) {
        finalImage = finalImage.replace(/width=\d+/, 'width=1440').replace(/height=\d+/, 'height=2160');
        if (!finalImage.includes('width=')) finalImage += (finalImage.includes('?') ? '&' : '?') + 'width=1440';
        if (!finalImage.includes('height=')) finalImage += '&height=2160';
        if (!finalImage.includes('model=flux')) finalImage += '&model=flux';
        if (!finalImage.includes('nologo=true')) finalImage += '&nologo=true';
      }

      return {
        ...item,
        image: finalImage,
        skills: typeof item.skills === 'string' ? item.skills.split(',').map((s: string) => s.trim()).filter(Boolean) : (item.skills || []),
        education: typeof item.education === 'string' ? item.education.split(',').map((s: string) => s.trim()).filter(Boolean) : (item.education || []),
        projects: typeof item.projects === 'string' ? item.projects.split(',').map((s: string) => s.trim()).filter(Boolean) : (item.projects || []),
        achievements: typeof item.achievements === 'string' ? item.achievements.split(',').map((s: string) => s.trim()).filter(Boolean) : (item.achievements || []),
        social: { email: item.email, linkedin: item.linkedin || '#' }
      };
    });

    const result = await TeamMember.insertMany(formattedData);
    res.status(201).json({ success: true, count: result.length });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
