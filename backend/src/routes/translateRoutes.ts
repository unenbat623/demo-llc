import { Router, Request, Response } from 'express';

const router = Router();


export async function translateToEnglish(text: string): Promise<string> {
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

router.post('/', async (req: Request, res: Response) => {
  try {
    const { texts } = req.body;

    const translatedJson: Record<string, string> = {};
    const keys = Object.keys(texts);

    await Promise.all(keys.map(async (key) => {
      translatedJson[key] = await translateToEnglish(texts[key]);
    }));

    res.json(translatedJson);
  } catch (err: any) {
    console.error('Translation route error:', err.message);
    res.status(500).json({ message: err.message });
  }
});

export default router;
