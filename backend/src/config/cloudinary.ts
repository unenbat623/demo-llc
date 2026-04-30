import path from 'path';
import fs from 'fs';

// FINAL CRASH-PROOF CONFIG (NO DEPENDENCIES REQUIRED)
// This file will not crash even if cloudinary and multer are missing.

let uploadMock: any = {
  single: (name: string) => (req: any, res: any, next: any) => {
    console.warn(`⚠️ Multer not installed. Skipping upload for field: ${name}`);
    next();
  },
  array: (name: string) => (req: any, res: any, next: any) => {
    console.warn(`⚠️ Multer not installed. Skipping bulk upload for field: ${name}`);
    next();
  },
  fields: (fields: any) => (req: any, res: any, next: any) => {
    console.warn(`⚠️ Multer not installed. Skipping fields upload`);
    next();
  }
};

let cloudinaryMock: any = {
  uploader: {
    destroy: async (id: string) => console.log('Mock delete from cloudinary:', id),
    upload: async (path: string) => ({ url: '', public_id: '' })
  },
  config: (config: any) => { }
};

// Try to use real modules if they ever get installed
try {
  // Use require to avoid compile-time errors
  const multer = require('multer');
  const cloudinary = require('cloudinary').v2;
  const { CloudinaryStorage } = require('multer-storage-cloudinary');

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'profiles',
      allowed_formats: ['jpg', 'png', 'jpeg'],
      transformation: [{ width: 500, height: 600, crop: 'fill', gravity: 'face' }]
    }
  });

  uploadMock = multer({ storage });
  cloudinaryMock = cloudinary;
  console.log('✅ Cloudinary & Multer initialized successfully');
} catch (e) {
  // Fallback to local storage if multer is available but cloudinary is not
  try {
    const multer = require('multer');
    const storage = multer.diskStorage({
      destination: 'uploads/',
      filename: (req: any, file: any, cb: any) => cb(null, Date.now() + '-' + file.originalname)
    });
    uploadMock = multer({ storage });
    console.warn('⚠️ Cloudinary not found. Using local Multer storage.');
  } catch (e2) {
    console.error('❌ Neither Cloudinary nor Multer found. File uploads will be disabled but server will run.');
  }
}

export const upload = uploadMock;
export const cloudinary = cloudinaryMock;
