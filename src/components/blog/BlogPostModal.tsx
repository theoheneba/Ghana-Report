import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Button } from '../ui/Button';
import { useBlogPosts } from '../../hooks/useBlogPosts';
import type { BlogPost } from '../../types/blog';

interface BlogPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  post?: BlogPost;
}

export function BlogPostModal({ isOpen, onClose, post }: BlogPostModalProps) {
  const { createPost, updatePost } = useBlogPosts();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<BlogPost>>(post || {
    title: '',
    content: '',
    excerpt: '',
    tags: [],
    cover_image: '',
    published: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (post) {
        await updatePost(post.id, formData);
        toast.success('Post updated successfully');
      } else {
        await createPost(formData);
        toast.success('Post created successfully');
      }
      onClose();
    } catch (error) {
      toast.error(post ? 'Failed to update post' : 'Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={post ? 'Edit Post' : 'Create New Post'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Title"
          value={formData.title}
          onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
          required
        />
        
        <Textarea
          label="Content"
          value={formData.content}
          onChange={e => setFormData(prev => ({ ...prev, content: e.target.value }))}
          required
          rows={10}
        />
        
        <Textarea
          label="Excerpt"
          value={formData.excerpt}
          onChange={e => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
          required
          rows={3}
        />
        
        <Input
          label="Tags (comma separated)"
          value={formData.tags?.join(', ')}
          onChange={e => setFormData(prev => ({ 
            ...prev, 
            tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean)
          }))}
        />
        
        <Input
          type="url"
          label="Cover Image URL"
          value={formData.cover_image}
          onChange={e => setFormData(prev => ({ ...prev, cover_image: e.target.value }))}
          placeholder="https://example.com/image.jpg"
        />
        
        <div className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}