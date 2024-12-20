import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { toast } from 'react-hot-toast';
import type { BlogPost } from '../types/blog';

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('blog_posts')
        .select(`
          *,
          author:admin_users(name)
        `)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setPosts(data.map(post => ({
        ...post,
        author_name: post.author?.name || 'Unknown'
      })));
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load blog posts');
    } finally {
      setIsLoading(false);
    }
  };

  const createPost = async (data: Partial<BlogPost>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('blog_posts')
        .insert({
          ...data,
          author_id: user.id,
          slug: generateSlug(data.title || '')
        });

      if (error) throw error;
      
      toast.success('Post created successfully');
      await fetchPosts();
    } catch (err) {
      console.error('Error creating post:', err);
      toast.error('Failed to create post');
      throw err;
    }
  };

  const updatePost = async (id: string, data: Partial<BlogPost>) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .update(data)
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Post updated successfully');
      await fetchPosts();
    } catch (err) {
      console.error('Error updating post:', err);
      toast.error('Failed to update post');
      throw err;
    }
  };

  const deletePost = async (id: string) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast.success('Post deleted successfully');
      await fetchPosts();
    } catch (err) {
      console.error('Error deleting post:', err);
      toast.error('Failed to delete post');
      throw err;
    }
  };

  return {
    posts,
    isLoading,
    error,
    createPost,
    updatePost,
    deletePost
  };
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}