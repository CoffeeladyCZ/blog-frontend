import { useState } from 'react';
import { httpPost, httpDelete } from '../utils/axiosService';

type AddImageResponse = {
  imageId: string;
  name: string;
};

export function useFileUpload() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [imageId, setImageId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const uploadFile = async (file: File | null) => {
    setIsLoading(true);
    try {
      setUploadedFile(file);
      if (file) {
        const formData = new FormData();
        formData.append('image', file);

        const response = await httpPost<AddImageResponse[]>('/images', formData);
        setImageId(response.data[0].imageId);
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
    setFeaturedImage
  };
}
