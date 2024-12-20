import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { BlogPost } from '../types/blog';

export function useBlogPost(slug: string) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      try {
        const { data, error: fetchError } = await supabase
          .from('blog_posts')
          .select(`
            *,
            author:admin_users(name, verified)
          `)
          .eq('slug', slug)
          .eq('published', true)
          .single();

        if (fetchError) throw fetchError;
        if (!data) throw new Error('Post not found');

        setPost({
          ...data,
          author_name: data.author?.name || 'Unknown',
          author_verified: data.author?.verified || false
        });
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Failed to load post');
      } finally {
        setIsLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  return { post, isLoading, error };
}