/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';
import { ENV } from '../config';

export const supabase = createClient(
  ENV.supabase.url || 'https://placeholder.supabase.co',
  ENV.supabase.key || 'placeholder'
);
