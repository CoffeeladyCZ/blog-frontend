import { useState } from 'react';
import { httpPost, httpDelete } from '../utils/axiosService';
import { supabase } from '@supabase/auth-ui-shared';

import useSupabase from '../hooks/useSupabase';

type AddImageResponse = {
  imageId: string;
  name: string;
};

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
      if (file) {
        const formData = new FormData();
        formData.append('image', file);

        if (supabase) {
          const fileName = file.name;
          const { data, error } = await supabase.storage.from('images').upload(fileName, file);

          const { publicUrl } = supabase.storage
            .from('images')
            .getPublicUrl(fileName);
  
          setFileUrl(publicUrl);

          // set image to datatable in Supabase
          const { data: imageData, error: dbError } = await supabase
          .from('images')
          .insert([{ name: fileName }])
          .select('image_id')
          .single();
  
        if (dbError) {
          console.error('Chyba při ukládání obrázku do DB:', dbError.message);
          return;
        }
        setImageId(imageData.image_id);
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
