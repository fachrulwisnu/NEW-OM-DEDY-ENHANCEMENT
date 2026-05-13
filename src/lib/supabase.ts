/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';
import { ENV } from '../config';

const supabaseUrl = ENV.supabase.url;
const supabaseAnonKey = ENV.supabase.key;

// Fail-Safe Initialization: Log error instead of crashing the whole app
if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase Error: Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Interactivity may be broken.");
}

export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      from: () => ({
        select: () => ({
          order: () => ({
            eq: () => ({
              single: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
              then: (cb: any) => Promise.resolve({ data: [], error: null }).then(cb)
            }),
            then: (cb: any) => Promise.resolve({ data: [], error: null }).then(cb)
          }),
          eq: () => ({
            single: () => Promise.resolve({ data: null, error: null }),
            then: (cb: any) => Promise.resolve({ data: [], error: null }).then(cb)
          }),
          then: (cb: any) => Promise.resolve({ data: [], error: null }).then(cb)
        }),
        insert: () => ({
          select: () => ({
            single: () => Promise.resolve({ data: null, error: null })
          })
        }),
        update: () => ({
          eq: () => ({
            select: () => ({
              single: () => Promise.resolve({ data: null, error: null })
            })
          })
        }),
        delete: () => ({
          eq: () => Promise.resolve({ error: null })
        }),
        on: () => ({ subscribe: () => ({ unsubscribe: () => {} }) }),
        channel: () => ({ on: () => ({ subscribe: () => {} }) })
      }),
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        onAuthStateChanged: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
        signOut: () => Promise.resolve({ error: null })
      }
    } as any;
