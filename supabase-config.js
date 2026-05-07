const SUPABASE_URL = 'https://ovzikuzzutokjvqympsx.supabase.co';
const SUPABASE_KEY = 'sb_publishable_-17J_o4P8twEcmyAJeE8vA_jJ9ZYO7A';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

window.supabaseClient = supabase;
