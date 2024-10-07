import { useState, useEffect } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabase: SupabaseClient | null = null;

const getSupabaseClient = () => {
  if (!supabase) {
    supabase = createClient(
      process.env.VITE_APP_SUPABASE_URL as string,
      process.env.VITE_APP_SUPABASE_ANNON_KEY as string
    );
  }
  return supabase;
};

const useSupabase = () => {
  const [client, setClient] = useState<SupabaseClient | null>(null);

  useEffect(() => {
    const supabaseClient = getSupabaseClient();
    setClient(supabaseClient);
  }, []);

  return client;
};

export default useSupabase;
