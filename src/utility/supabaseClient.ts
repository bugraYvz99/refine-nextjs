import { createClient } from "@refinedev/supabase";

const SUPABASE_URL = "https://lbidoffljwbhadkbzlxq.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxiaWRvZmZsandiaGFka2J6bHhxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc1NjAyNjgsImV4cCI6MjAwMzEzNjI2OH0.ppFifFG-79phKBIYmef-xc-ynY7PAua6O_mhTcXoIVk";

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  
  },
  auth: {
    persistSession: true,
  },
  
});
