
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://kmrnzrszgpealyrcyhqr.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imttcm56cnN6Z3BlYWx5cmN5aHFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk4NTQ5MTEsImV4cCI6MjA1NTQzMDkxMX0.LFiYIBBV8t8AgqEcAHzr7W1LPpeIHrfcDpmXoofNgiA";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
