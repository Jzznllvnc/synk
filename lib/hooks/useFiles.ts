import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { uploadFile, deleteFile as deleteStorageFile } from '../storage';
import type { Database } from '../database.types';

type FileMetadata = Database['public']['Tables']['files']['Row'];
type FileInsert = Database['public']['Tables']['files']['Insert'];

export function useFiles() {
  const [files, setFiles] = useState<FileMetadata[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchFiles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('files')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFiles(data || []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  const uploadNewFile = async (file: File, description?: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Upload to storage
      const { path } = await uploadFile({ file, userId: user.id });

      // Save metadata to database
      const fileData: Omit<FileInsert, 'user_id'> = {
        name: file.name,
        file_path: path,
        file_size: file.size,
        mime_type: file.type,
        description: description || null,
      };

      const { data, error } = await supabase
        .from('files')
        .insert({ ...fileData, user_id: user.id })
        .select()
        .single();

      if (error) throw error;
      setFiles((prev) => [data, ...prev]);
      return data;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const deleteFile = async (id: string, filePath: string) => {
    try {
      // Delete from storage
      await deleteStorageFile(filePath);

      // Delete metadata from database
      const { error } = await supabase
        .from('files')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setFiles((prev) => prev.filter((file) => file.id !== id));
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return {
    files,
    loading,
    error,
    uploadFile: uploadNewFile,
    deleteFile,
    refetch: fetchFiles,
  };
}

