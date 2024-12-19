import { supabase } from '../lib/supabase';

export async function uploadFile(file: File, reportId: string): Promise<string> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${reportId}/${Math.random().toString(36).slice(2)}.${fileExt}`;
    const { error: uploadError } = await supabase.storage
      .from('report-evidence')
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('report-evidence')
      .getPublicUrl(fileName);

    return publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw new Error('Failed to upload file');
  }
}