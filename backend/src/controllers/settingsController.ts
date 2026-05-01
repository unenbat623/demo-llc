import { Request, Response } from 'express';
import Settings from '../models/Settings';
import { processImage } from '../utils/imageUtils';

export const getSettings = async (req: Request, res: Response) => {
  try {
    const settings = await Settings.findOne() || await Settings.create({});
    res.json(settings);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const updateSettings = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    for (const key in data) {
      if (typeof data[key] === 'string') {
        const val = data[key];
        const isPotentialMedia = val.startsWith('data:') || 
                                (val.startsWith('http') && (
                                  val.match(/\.(jpeg|jpg|gif|png|webp|svg|mp4|webm|ogg)$/i) || 
                                  key.toLowerCase().includes('image') || 
                                  key.toLowerCase().includes('logo') || 
                                  key.toLowerCase().includes('favicon')
                                ));
        
        if (isPotentialMedia) {
          data[key] = await processImage(val, 'settings');
        }
      }
    }
    const settings = await Settings.findOneAndUpdate({}, data, { new: true, upsert: true });
    res.json(settings);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
