import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import path from 'path';
import fs from 'fs';

const isConfigured = 
  process.env.CLOUDINARY_URL || (
    process.env.CLOUDINARY_CLOUD_NAME && 
    process.env.CLOUDINARY_API_KEY && 
    process.env.CLOUDINARY_API_SECRET
  );

if (process.env.CLOUDINARY_URL) {
  cloudinary.config({
    cloudinary_url: process.env.CLOUDINARY_URL
  });
  console.log('☁️ Cloudinary initialized using CLOUDINARY_URL');
} else if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  console.log('☁️ Cloudinary initialized with individual credentials');
}

/**
 * Uploads a file (Base64 or local path) directly to Cloudinary
 */
export const uploadToCloudinary = async (fileSource: string, folder: string = 'profiles') => {
  if (!isConfigured) return null;
  try {
    const result = await cloudinary.uploader.upload(fileSource, {
      folder,
      resource_type: 'auto'
    });
    return result.secure_url;
  } catch (error: any) {
    console.error('Cloudinary direct upload error:', error?.message || error);
    // If upload fails, return the original source as fallback instead of null
    return fileSource;
  }
};

const localDiskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/profiles';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const cloudinaryStorage = isConfigured ? new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req: any, file: any) => {
    return {
      folder: 'profiles',
      format: 'png',
      public_id: Date.now() + '-' + file.originalname.split('.')[0]
    };
  }
}) : null;

export const upload = multer({
  storage: (isConfigured && cloudinaryStorage) ? cloudinaryStorage : localDiskStorage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }
});

export { cloudinary };
