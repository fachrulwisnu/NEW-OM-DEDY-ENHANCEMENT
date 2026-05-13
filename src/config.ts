// Centralized environment variable handler with fail-safe logic
const getEnv = (key: string, defaultValue: string = ""): string => {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key]) {
    return import.meta.env[key];
  }
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key] as string;
  }
  return defaultValue;
};

export const ENV = {
  supabase: {
    url: getEnv('VITE_SUPABASE_URL'),
    key: getEnv('VITE_SUPABASE_ANON_KEY') || getEnv('SUPABASE_SERVICE_ROLE_KEY'),
  },
  notion: {
    key: getEnv('NOTION_API_KEY'),
    dbId: getEnv('NOTION_DATABASE_ID'),
  },
  kaldev: getEnv('KALDEV_SECRET_TOKEN'),
  pmaSecret: getEnv('OMDEDY_PMA_SECRET'),
};

// Global Guard: Log warnings instead of crashing to maintain app stability
if (!ENV.supabase.url) console.warn("Critical: VITE_SUPABASE_URL is missing.");
if (!ENV.supabase.key) console.warn("Critical: VITE_SUPABASE_ANON_KEY is missing.");
if (!ENV.notion.key) console.warn("Warning: NOTION_API_KEY is missing.");
if (!ENV.notion.dbId) console.warn("Warning: NOTION_DATABASE_ID is missing.");
