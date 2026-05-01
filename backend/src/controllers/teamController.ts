import { Request, Response } from 'express';
import TeamMember, { ITeamMember } from '../models/TeamMember';
import { translateToEnglish } from '../routes/translateRoutes';
import { processImage } from '../utils/imageUtils';

let teamCache: ITeamMember[] | null = null;
let lastCacheTime = 0;
const CACHE_TTL = 60 * 1000;

const clearTeamCache = () => {
  teamCache = null;
};

export const getTeam = async (req: Request, res: Response) => {
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
};

export const createMember = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    data.image = await processImage(data.image, 'profiles');

    const member = new TeamMember(data);
    const newMember = await member.save();
    clearTeamCache();
    res.status(201).json(newMember);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const updateMember = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    data.image = await processImage(data.image, 'profiles');

    const updatedMember = await TeamMember.findByIdAndUpdate(req.params.id, data, { new: true });
    clearTeamCache();
    res.json(updatedMember);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteMember = async (req: Request, res: Response) => {
  try {
    await TeamMember.findByIdAndDelete(req.params.id);
    clearTeamCache();
    res.json({ message: 'Устгагдлаа' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const bulkDeleteMembers = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;
    await TeamMember.deleteMany({ _id: { $in: ids } });
    clearTeamCache();
    res.json({ message: 'Амжилттай устгагдлаа' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const bulkImportMembers = async (req: Request, res: Response) => {
  try {
    const members = req.body;
    if (!Array.isArray(members))
      return res.status(400).json({ message: 'Data must be an array' });

    const formattedData = await Promise.all(members.map(async (item: any) => {
      let finalImage = item.image || item.Image || item.photo || item.Photo || item.avatar || item.Avatar || item.url || item.URL || item['Зураг'] || item['зураг'];
      
      finalImage = await processImage(finalImage, 'profiles');

      if (!finalImage || (typeof finalImage === 'string' && !finalImage.startsWith('http') && !finalImage.startsWith('data:image'))) {
        const nameToUse = encodeURIComponent(item.name || 'Team Member');
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
    }));

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
          ].map(f => f.replace(/\n/g, ' '));

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
              item.name_en = item.name;
              item.position_en = item.position;
            }
          }

          if (!item.name_en) item.name_en = item.name;
          if (!item.position_en) item.position_en = item.position;
        }));
      }
    } catch (transErr) {
      console.error('[TRANSLATION ERROR]:', transErr);
      formattedData.forEach((item: any) => {
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
};
