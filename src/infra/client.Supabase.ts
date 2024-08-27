import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import { createClient } from '@supabase/supabase-js';

const { SUPABASE_URL, SUPABASE_KEY } = process.env;

if(!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error('Não foi possível estabelecer conexão com o servidor Supabase');
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);