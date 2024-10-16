import { useState } from 'react';

import { supabase } from '../supabaseClient';

export function useFileUpload() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [imageId, setImageId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const uploadFile = async (file: File) => {
    setIsLoading(true);
    try {
      setUploadedFile(file);
      const formData = new FormData();
      formData.append('image', file);

      if (!supabase) return;

      const fileName = file.name;

      // remove previous image from storage
      const savedImage = localStorage.getItem('image');
      if (savedImage) {
        const previousImage = JSON.parse(savedImage);
        await supabase.storage.from('images').remove([previousImage.imageId]);
      }

      const { data } = await supabase.storage.from('images').upload(fileName, file);
      const { data: dataUrl } = supabase.storage.from('images').getPublicUrl(fileName);

      if (data) {
        setImageId(data.id);
        setFileUrl(dataUrl.publicUrl);

        const localStorageData = {
          imageId: data.id,
          imageUrl: dataUrl.publicUrl,
          name: data.path
        };
        localStorage.setItem('image', JSON.stringify(localStorageData));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteFile = async (imageId: string) => {
    if (supabase) {
      try {
        const { error: dbError } = await supabase
          .from('images')
          .delete()
          .match({ image_id: imageId });

        if (dbError) {
          console.error('Chyba při mazání obrázku z databáze:', dbError.message);
          return;
        }

        const { error: storageError } = await supabase.storage.from('images').remove([imageId]);

        localStorage.removeItem('image');

        if (storageError) {
          console.error('Chyba při mazání souboru ze storage:', storageError.message);
          return;
        }
      } catch (error) {
        console.error('Chyba při mazání obrázku:', error);
      }
    }
  };

  const cleanFileInput = () => {
    setUploadedFile(null);
    setImageId(null);
  };

  const setFeaturedImage = (imageId: string) => {
    setImageId(imageId);
  };

  const getImage = async (imageId: string) => {
    if (!supabase) return;
    const { data } = await supabase.from('images').select('name').eq('image_id', imageId).single();
    if (data) {
      return getImageUrl(data.name, 'images');
    }
  };

  const getImageUrl = (imageName: string, bucket: string) => {
    const { data } = supabase.storage.from(bucket).getPublicUrl(imageName);

    return data.publicUrl;
  };

  return {
    uploadedFile,
    imageId,
    cleanFileInput,
    isLoading,
    uploadFile,
    deleteFile,
    fileUrl,
    setFeaturedImage,
    getImageUrl,
    getImage
  };
}
