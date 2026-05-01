import express from 'express';
import { upload } from '../config/cloudinary';

const router = express.Router();

router.post('/image', upload.single('image'), (req: any, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    let fileUrl = req.file.path;

    if (!fileUrl.startsWith('http')) {
      const protocol = req.protocol;
      const host = req.get('host');
      fileUrl = `${protocol}://${host}/${fileUrl}`;
    }

    res.json({
      url: fileUrl,
      public_id: req.file.filename || req.file.originalname
    });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || 'Error uploading image'
    });
  }
});

router.post('/avatar', upload.single('avatar'), (req: any, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    let fileUrl = req.file.path;
    if (!fileUrl.startsWith('http')) {
      const protocol = req.protocol;
      const host = req.get('host');
      fileUrl = `${protocol}://${host}/${fileUrl}`;
    }

    res.json({
      url: fileUrl,
      public_id: req.file.filename || req.file.originalname
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Error uploading avatar' });
  }
});

export default router;
