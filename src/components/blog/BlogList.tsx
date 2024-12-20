import React from 'react';
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { BlogEditor } from './BlogEditor';
import type { BlogPost } from '../../types/blog';

interface BlogListProps {
  posts: BlogPost[];
  onUpdate: (id: string, data: Partial<BlogPost>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function BlogList({ posts, onUpdate, onDelete }: BlogListProps) {
  const handleTogglePublish = async (post: BlogPost) => {
    await onUpdate(post.id, { published: !post.published });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      await onDelete(id);
    }
  };

  return (
    <div className="space-y-4">
      {posts.map(post => (
        <Card key={post.id} className="p-4">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <Badge variant={post.published ? 'green' : 'yellow'}>
                  {post.published ? 'Published' : 'Draft'}
                </Badge>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">{post.excerpt}</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleTogglePublish(post)}
                title={post.published ? 'Unpublish' : 'Publish'}
              >
                {post.published ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
              <BlogEditor post={post} onSave={(data) => onUpdate(post.id, data)}>
                <Button variant="ghost" size="sm" title="Edit">
                  <Edit className="w-4 h-4" />
                </Button>
              </BlogEditor>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(post.id)}
                className="text-red-600 hover:text-red-700"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}