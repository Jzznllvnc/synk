import { supabase } from './supabase';

const BUCKET_NAME = 'user-files';

export interface UploadFileOptions {
  file: File;
  userId: string;
  onProgress?: (progress: number) => void;
}

// Upload file to user's private folder
export async function uploadFile({ file, userId }: UploadFileOptions) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `${userId}/${fileName}`;

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  // Get public URL (for private bucket, this requires signed URL)
  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(filePath);

  return {
    path: data.path,
    url: urlData.publicUrl,
  };
}

// Get signed URL for private file (expires after specified time)
export async function getSignedUrl(filePath: string, expiresIn: number = 3600) {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .createSignedUrl(filePath, expiresIn);

  if (error) throw error;
  return data.signedUrl;
}

// Delete file
export async function deleteFile(filePath: string) {
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([filePath]);

  if (error) throw error;
}

// List user's files
export async function listUserFiles(userId: string) {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .list(userId, {
      limit: 100,
      offset: 0,
      sortBy: { column: 'created_at', order: 'desc' },
    });

  if (error) throw error;
  return data;
}

// Download file
export async function downloadFile(filePath: string) {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .download(filePath);

  if (error) throw error;
  return data;
}

