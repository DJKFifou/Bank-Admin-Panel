import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const database = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_SUPABASE_SERVICE_ROLE_KEY
);

export default database;