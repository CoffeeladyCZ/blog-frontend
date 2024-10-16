import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_APP_SUPABASE_URL as string;
const supabaseAnnon = process.env.VITE_APP_SUPABASE_ANNON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnnon);
