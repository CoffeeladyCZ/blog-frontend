import useSupabase from '../supabaseClient';
import { useTranslation } from 'react-i18next';

export function useImage() {
  const supabase = useSupabase();
  const { t } = useTranslation();

  const getImageUrl = (imageId: string) => {
    if (!supabase) {
      return null;
    }
    const { data, error } = supabase.storage.from('images').getPublicUrl(imageId);

    if (error) {
      console.error(t('notifications.noImage'), error);
      return null;
    }

    return data?.publicUrl || null;
  }

  return { getImageUrl };
}