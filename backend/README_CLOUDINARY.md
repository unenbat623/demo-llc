# Cloudinary Integration Walkthrough

This document outlines the steps taken to integrate Cloudinary into the Tavan Bogd Tech platform.

## 1. Backend Configuration
The configuration in `backend/src/config/cloudinary.ts` is designed to be **crash-proof**. 
- **Offline Mode**: If `cloudinary` or `multer` are missing, it uses dummy functions so the server can still run.
- **Online Mode**: Once installed, it automatically uses Cloudinary for storage.
- **Transformation**: All profile images are automatically resized to **500x600px** with **face-gravity** cropping for a professional look.

## 2. API Endpoints
New routes are available at:
- `POST /api/upload/image`: General image upload.
- `POST /api/upload/avatar`: Profile-specific upload.

These routes return a `url` which is then saved to the database.

## 3. Frontend Usage
- **Team Members**: Images are uploaded via `useTeamFileUpload` hook.
- **Website Settings**: Hero backgrounds and logos use the same upload logic in `useAdminSettings`.
- **UI States**: Added `isUploading` indicators to prevent data loss while a file is being sent to the cloud.

## 4. How to Enable in Production
1. Ensure your `.env` has the correct `CLOUDINARY_...` credentials.
2. Run `npm install` to get the necessary packages.
3. The system will detect the packages and switch from "Mock" mode to "Cloudinary" mode automatically.
