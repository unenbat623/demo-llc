import { uploadToCloudinary } from '../config/cloudinary';

/**
 * Checks if a string is a base64 image or an external URL and uploads it to Cloudinary.
 * If it's already a Cloudinary URL or doesn't need processing, returns the original value.
 */
export async function processImage(image: string | undefined, folder: string = 'profiles'): Promise<string | undefined> {
  if (!image) return image;

  const isExternalUrl = typeof image === 'string' && image.startsWith('http') && !image.includes('cloudinary.com');
  const isBase64 = typeof image === 'string' && image.startsWith('data:image');

  if (isExternalUrl || isBase64) {
    try {
      const cloudUrl = await uploadToCloudinary(image, folder);
      return cloudUrl || image;
    } catch (uploadErr) {
      console.error(`[IMAGE PROCESS] Failed to upload image to Cloudinary:`, uploadErr);
      return image;
    }
  }

  return image;
}
