import { useState } from 'react';
import { httpDelete } from '../utils/axiosService';

import useSupabase from '../hooks/useSupabase';

export function useFileUpload() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [imageId, setImageId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const supabase = useSupabase();

  const uploadFile = async (file: File | null) => {
    setIsLoading(true);
    try {
      setUploadedFile(file);

      // if exist image_id in localStorage use it
      const storedImageId = localStorage.getItem('image_id');
      if (storedImageId) {
        setImageId(storedImageId);
        setIsLoading(false);
      }

      if (file) {
        const formData = new FormData();
        formData.append('image', file);

        if (supabase) {
          const fileName = file.name;
          const { data } = await supabase.storage.from('images').upload(fileName, file);
          if (data) {
            setImageId(data.id);
          }

          const { data: dataUrl } = supabase.storage.from('images').getPublicUrl(fileName);

          const publicUrl = dataUrl.publicUrl;
          setFileUrl(publicUrl);

          const localStorageData = {
            imageId: data?.id,
            fileUrl: dataUrl.publicUrl
          };
          localStorage.setItem('image', JSON.stringify(localStorageData));

          // set image to datatable in Supabase
          const { error: dbError } = await supabase
            .from('images')
            .insert([{ name: fileName }])
            .select('image_id')
            .single();

          if (dbError) {
            console.error('Chyba při ukládání obrázku do DB:', dbError.message);
            return;
          }
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteFile = async (imageId: string | null) => {
    try {
      if (imageId) {
        await httpDelete(`/images/${imageId}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
    setImageId(null);
    setUploadedFile(null);
  };

  const cleanFileInput = () => {
    setUploadedFile(null);
    setImageId(null);
  };

  const setFeaturedImage = (imageId: string) => {
    setImageId(imageId);
  };

  return {
    uploadedFile,
    imageId,
    cleanFileInput,
    isLoading,
    uploadFile,
    deleteFile,
    fileUrl,
    setFeaturedImage
  };
}
