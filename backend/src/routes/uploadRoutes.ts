import express from 'express';
import { upload } from '../config/cloudinary';

const router = express.Router();

// Upload a single image
router.post('/image', upload.single('image'), (req: any, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // In local mode, file.path might be a relative path. 
    // In cloudinary mode, it's a URL.
    let fileUrl = req.file.path;
    
    // Simple check to prepend base URL if it's a local path (and not a full URL)
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
    res.status(500).json({ message: 'Error uploading image' });
  }
});

// For backward compatibility or specific user avatar route
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
