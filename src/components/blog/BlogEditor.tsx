import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Modal } from '../ui/Modal';
import type { BlogPost } from '../../types/blog';

interface BlogEditorProps {
  post?: BlogPost;
  onSave: (data: Partial<BlogPost>) => Promise<void>;
}

export function BlogEditor({ post, onSave }: BlogEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<BlogPost>>(post || {
    title: '',
    content: '',
    excerpt: '',
    tags: [],
    published: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave(formData);
    setIsOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>
        <PlusCircle className="w-4 h-4 mr-2" />
        New Post
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={post ? 'Edit Post' : 'New Post'}
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
              tags: e.target.value.split(',').map(t => t.trim()) 
            }))}
          />
          
          <Input
            type="url"
            label="Cover Image URL"
            value={formData.cover_image}
            onChange={e => setFormData(prev => ({ ...prev, cover_image: e.target.value }))}
          />
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {post ? 'Update' : 'Create'} Post
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}