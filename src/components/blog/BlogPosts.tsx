import React from 'react';
import { BlogCard } from './BlogCard';
import type { BlogPost } from '../../types/blog';

interface BlogPostsProps {
  posts: BlogPost[];
}

export function BlogPosts({ posts }: BlogPostsProps) {
  return (
    <div className="space-y-8">
      {posts.map(post => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
}