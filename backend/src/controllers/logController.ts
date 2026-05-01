import { Request, Response } from 'express';
import Log from '../models/Log';

export const getLogs = async (req: Request, res: Response) => {
  try {
    res.json(await Log.find().sort({ createdAt: -1 }));
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createLog = async (req: Request, res: Response) => {
  try {
    res.status(201).json(await new Log(req.body).save());
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const clearLogs = async (req: Request, res: Response) => {
  try {
    await Log.deleteMany({});
    res.json({ message: 'All logs deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteLog = async (req: Request, res: Response) => {
  try {
    const deleted = await Log.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Log not found' });
    res.json({ message: 'Log deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
