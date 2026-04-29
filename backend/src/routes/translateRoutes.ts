import { Router, Request, Response } from 'express';

const router = Router();

const fallbackTranslate = async (textsObj: Record<string, string>): Promise<Record<string, string>> => {
  const result: Record<string, string> = {};
  for (const key of Object.keys(textsObj)) {
    try {
      const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(textsObj[key])}&langpair=mn|en`);
      const data = await res.json();
      result[key] = data.responseData?.translatedText || textsObj[key];
    } catch {
      result[key] = textsObj[key];
    }
  }
  return result;
};

router.post('/', async (req: Request, res: Response) => {
  try {
    const { texts } = req.body;

    if (!process.env.OPENAI_API_KEY) {
      console.warn('OPENAI_API_KEY not found, falling back to MyMemory API');
      return res.json(await fallbackTranslate(texts));
    }

    const systemPrompt = "You are a professional translator. Translate the following JSON object's string values from Mongolian to English. Return ONLY the translated JSON object, maintaining the exact same keys.";

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: JSON.stringify(texts) }
        ],
        temperature: 0.3,
        response_format: { type: 'json_object' }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData.error?.message);
      console.warn('Falling back to MyMemory API due to OpenAI error');
      return res.json(await fallbackTranslate(texts));
    }

    const data = await response.json();
    const translatedJson = JSON.parse(data.choices[0].message.content);
    res.json(translatedJson);
  } catch (err: any) {
    console.error('Translation route error:', err.message);
    res.status(500).json({ message: err.message });
  }
});

export default router;
