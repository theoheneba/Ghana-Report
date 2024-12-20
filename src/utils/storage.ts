import { supabase } from '../lib/supabase';

export async function uploadFile(file: File, bucket: string, path: string): Promise<string> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${path}/${Math.random().toString(36).slice(2)}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Failed to upload file');
  }
}

export async function uploadFiles(files: File[], bucket: string, path: string): Promise<string[]> {
  try {
    const uploadPromises = files.map(file => uploadFile(file, bucket, path));
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error('Error uploading files:', error);
    throw new Error('Failed to upload files');
  }
}