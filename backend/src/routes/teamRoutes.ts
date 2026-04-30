import { Router, Request, Response } from 'express';
import TeamMember from '../models/TeamMember';

const router = Router();

async function translateToEnglish(text: string): Promise<string> {
  if (!text || !text.trim()) return '';
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=mn&tl=en&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    const data = await res.json();
    return data[0]?.map((x: any) => x[0]).join('') || text;
  } catch {
    return text;
  }
}

let teamCache: any = null;
let lastCacheTime = 0;
const CACHE_TTL = 60 * 1000;

const clearTeamCache = () => {
  teamCache = null;
};

router.get('/', async (req: Request, res: Response) => {
  try {
    if (teamCache && Date.now() - lastCacheTime < CACHE_TTL) {
      return res.json(teamCache);
    }
    const members = await TeamMember.find().sort({ createdAt: -1 });
    teamCache = members;
    lastCacheTime = Date.now();
    res.json(members);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const member = new TeamMember(req.body);
    const newMember = await member.save();
    clearTeamCache();
    res.status(201).json(newMember);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedMember = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
    clearTeamCache();
    res.json(updatedMember);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deletedMember = await TeamMember.findByIdAndDelete(req.params.id);
    clearTeamCache();
    res.json({ message: 'Устгагдлаа' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Bulk Delete
router.post('/bulk-delete', async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;
    await TeamMember.deleteMany({ _id: { $in: ids } });
    clearTeamCache();
    res.json({ message: 'Амжилттай устгагдлаа' });
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
        const nameToUse = encodeURIComponent(item.name || 'Team Member');
        // Use a lightweight, fast avatar generator instead of heavy AI images for bulk imports
        finalImage = `https://ui-avatars.com/api/?name=${nameToUse}&background=random&color=fff&size=512`;
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

    try {
      const chunkSize = 50;
      for (let i = 0; i < formattedData.length; i += chunkSize) {
        const chunk = formattedData.slice(i, i + chunkSize);

        await Promise.all(chunk.map(async (item: any) => {
          const skills = (item.skills || []).map((s: string) => s.trim()).filter(Boolean);
          const education = (item.education || []).map((s: string) => s.trim()).filter(Boolean);
          const projects = (item.projects || []).map((s: string) => s.trim()).filter(Boolean);
          const achievements = (item.achievements || []).map((s: string) => s.trim()).filter(Boolean);

          const fields = [
            item.name || '',
            item.position || '',
            item.aboutMe || '',
            item.experience || '',
            ...skills,
            ...education,
            ...projects,
            ...achievements
          ].map(f => f.replace(/\n/g, ' ')); // Remove internal newlines

          if (fields.length > 0) {
            const combinedText = fields.join('\n');
            const translatedCombined = await translateToEnglish(combinedText);
            const translatedFields = translatedCombined.split('\n').map(s => s.trim());

            if (translatedFields.length === fields.length) {
              let idx = 0;
              item.name_en = translatedFields[idx++];
              item.position_en = translatedFields[idx++];
              item.aboutMe_en = translatedFields[idx++];
              item.experience_en = translatedFields[idx++];

              item.skills_en = translatedFields.slice(idx, idx + skills.length); idx += skills.length;
              item.education_en = translatedFields.slice(idx, idx + education.length); idx += education.length;
              item.projects_en = translatedFields.slice(idx, idx + projects.length); idx += projects.length;
              item.achievements_en = translatedFields.slice(idx, idx + achievements.length);
            } else {
              // Fallback
              item.name_en = item.name;
              item.position_en = item.position;
            }
          }

          // Sanity check
          if (!item.name_en) item.name_en = item.name;
          if (!item.position_en) item.position_en = item.position;
        }));
      }
      console.log('✅ Translation completed using Google Translate');
    } catch (transErr) {
      console.error('[TRANSLATION ERROR]:', transErr);
      formattedData.forEach(item => {
        if (!item.name_en) item.name_en = item.name;
        if (!item.position_en) item.position_en = item.position;
      });
    }

    const result = await TeamMember.insertMany(formattedData);
    clearTeamCache();
    res.status(201).json({ success: true, count: result.length });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;