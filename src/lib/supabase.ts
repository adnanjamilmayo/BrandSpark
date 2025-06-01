import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our database tables
export type NameGeneration = {
  id: string;
  user_id: string;
  name: string;
  description: string;
  created_at: string;
  is_favorite: boolean;
  collection_id?: string;
};

export type Collection = {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  created_at: string;
  color?: string;
};

// Helper functions
export const saveNameGeneration = async (generation: Omit<NameGeneration, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('name_generations')
    .insert([generation])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getSavedGenerations = async (userId: string) => {
  const { data, error } = await supabase
    .from('name_generations')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const createCollection = async (collection: Omit<Collection, 'id' | 'created_at'>) => {
  const { data, error } = await supabase
    .from('collections')
    .insert([collection])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const getCollections = async (userId: string) => {
  const { data, error } = await supabase
    .from('collections')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}; 