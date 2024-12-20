import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { AuthorBadge } from '../components/blog/AuthorBadge';
import { useBlogPost } from '../hooks/useBlogPost';
import { formatDate } from '../utils/date';

export function BlogPost() {
  const { slug } = useParams();
  const { post, isLoading, error } = useBlogPost(slug!);

  if (isLoading) {
    return (
      <PageLayout>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </PageLayout>
    );
  }

  if (error || !post) {
    return (
      <PageLayout>
        <Card className="p-6 bg-red-50 dark:bg-red-900/20">
          <p className="text-red-600 dark:text-red-400">
            {error || 'Post not found'}
          </p>
        </Card>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <article className="max-w-4xl mx-auto">
        {post.cover_image && (
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-96 object-cover rounded-lg mb-8"
          />
        )}

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        <div className="flex items-center justify-between mb-8">
          <AuthorBadge 
            name={post.author_name} 
            verified={post.author_verified}
          />
          <div className="text-sm text-gray-500">
            {formatDate(post.created_at)}
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none mb-8">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </article>
    </PageLayout>
  );
}