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
    const newMember = await member.save();
    res.status(201).json(newMember);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedMember = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedMember);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await TeamMember.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Bulk Delete
router.post('/bulk-delete', async (req: Request, res: Response) => {
  try {
    const { ids } = req.body;
    await TeamMember.deleteMany({ _id: { $in: ids } });
    res.json({ success: true });
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

    // Auto-translation logic
    if (process.env.OPENAI_API_KEY && formattedData.length > 0) {
      try {
        const translationQueue: any[] = [];
        formattedData.forEach((item, index) => {
          translationQueue.push({
            id: index,
            name: item.name,
            position: item.position,
            aboutMe: item.aboutMe || '',
            experience: item.experience || '',
            skills: item.skills?.join(', ') || '',
            education: item.education?.join(', ') || '',
            projects: item.projects?.join(', ') || '',
            achievements: item.achievements?.join(', ') || ''
          });
        });

        const systemPrompt = `You are an expert English-Mongolian translator specialized in corporate and technology sectors. 
Your task is to translate an array of team member objects for "Tavan Bogd Tech" company.
Translate all string values to professional English.

Guidelines:
- Professional, corporate tone.
- Transliterate names accurately.
- Use standard corporate titles.
- Return a JSON object with a "members" key containing the translated array.
- Maintain the same order as the input array.`;

        const transResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: JSON.stringify(translationQueue) }
            ],
            temperature: 0.1,
            response_format: { type: 'json_object' }
          })
        });

        if (transResponse.ok) {
          const transData = await transResponse.json();
          const resultObj = JSON.parse(transData.choices[0].message.content);
          const finalTranslations = resultObj.members;

          console.log(`[TRANSLATION DEBUG] OpenAI returned ${Array.isArray(finalTranslations) ? finalTranslations.length : 'NOT AN ARRAY'} translations.`);

          if (Array.isArray(finalTranslations)) {
            finalTranslations.forEach((trans: any, i: number) => {
              if (formattedData[i]) {
                // Ensure we map the fields correctly to the model's schema
                formattedData[i].name_en = trans.name || formattedData[i].name;
                formattedData[i].position_en = trans.position || formattedData[i].position;
                formattedData[i].aboutMe_en = trans.aboutMe || '';
                formattedData[i].experience_en = trans.experience || '';
                
                // Handle arrays correctly
                const splitArray = (str: string) => str ? str.split(',').map((s: string) => s.trim()).filter(Boolean) : [];
                
                formattedData[i].skills_en = splitArray(trans.skills);
                formattedData[i].education_en = splitArray(trans.education);
                formattedData[i].projects_en = splitArray(trans.projects);
                formattedData[i].achievements_en = splitArray(trans.achievements);
                
                console.log(`[TRANSLATION DEBUG] Translated member ${i}: ${formattedData[i].name} -> ${formattedData[i].name_en}`);
              }
            });
          } else {
            console.error('[TRANSLATION ERROR] resultObj.members is not an array:', resultObj);
          }
        } else {
          const errBody = await transResponse.json();
          console.error('[TRANSLATION ERROR] OpenAI API error:', errBody);
        }
      } catch (transErr) {
        console.error('[TRANSLATION ERROR] Unexpected error during auto-translation:', transErr);
      }
    }

    const result = await TeamMember.insertMany(formattedData);
    res.status(201).json({ success: true, count: result.length });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
