import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://rzgynsfiamtogwhcajnt.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6Z3luc2ZpYW10b2d3aGNham50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4MzM4NTcsImV4cCI6MjA2MTQwOTg1N30.j-l7GigI5hZLbHwoP8e70JbOTF3XIdeZGFqjgZgVkaw"

export const supabase = createClient(supabaseUrl, supabaseAnonKey); 