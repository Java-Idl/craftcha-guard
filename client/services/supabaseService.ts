import { Comment } from '../types';
import { createClient } from '@supabase/supabase-js';

// --- Configuration ---
// Using credentials provided by the user.
// URL: https://djkgoyptbiqswzizvmla.supabase.co
// Key: sb_publishable_7SOK_jK2IXU5dcsKU3lENA_3vQxP8BW

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://djkgoyptbiqswzizvmla.supabase.co';
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY || 'sb_publishable_7SOK_jK2IXU5dcsKU3lENA_3vQxP8BW';

console.log(`[Supabase] Initializing client...`);

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

// Local Storage Fallback Key
const STORAGE_KEY = 'craftcha_comments_cache';

export const CommentService = {
  getComments: async (): Promise<Comment[]> => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      const comments = (data || []).map(row => ({
        id: row.id,
        user: row.username,
        text: row.text,
        timestamp: row.created_at
      }));

      // Cache successful fetch
      localStorage.setItem(STORAGE_KEY, JSON.stringify(comments.slice(0, 50)));
      return comments;

    } catch (e) {
      console.warn("Supabase connection failed. Using local fallback.", e);

      // Attempt to load from local storage if API fails
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        try {
          return JSON.parse(cached);
        } catch (jsonErr) { }
      }

      return [
        { id: 999, user: 'System', text: 'Connection failed. Showing cached/mock data.', timestamp: new Date().toISOString() }
      ];
    }
  },

  postComment: async (text: string, username: string, token: string): Promise<Comment> => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([
          { username: username, text: text }
        ])
        .select()
        .single();

      if (error) throw error;

      return {
        id: data.id,
        user: data.username,
        text: data.text,
        timestamp: data.created_at
      };
    } catch (e: any) {
      console.error("Failed to post comment to Supabase", e);
      // Rethrow with a clear message so the UI alert shows something useful.
      throw new Error(e.message || "Network error or invalid configuration");
    }
  }
};