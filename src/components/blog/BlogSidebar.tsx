import React from 'react';
import { Link } from 'react-router-dom';
import { Tag, TrendingUp } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import type { BlogPost } from '../../types/blog';

interface BlogSidebarProps {
  posts: BlogPost[];
}

export function BlogSidebar({ posts }: BlogSidebarProps) {
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));
  const popularPosts = [...posts]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Popular Posts
        </h3>
        <div className="space-y-4">
          {popularPosts.map(post => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="block hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-lg transition-colors"
            >
              <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                {post.title}
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(post.created_at).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Tag className="w-5 h-5" />
          Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {allTags.map(tag => (
            <Badge
              key={tag}
              variant="outline"
              className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </Card>
    </div>
  );
}