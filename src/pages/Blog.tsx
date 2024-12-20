import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { BlogPosts } from '../components/blog/BlogPosts';
import { BlogSidebar } from '../components/blog/BlogSidebar';
import { useBlogPosts } from '../hooks/useBlogPosts';

export function Blog() {
  const { posts, isLoading } = useBlogPosts();

  return (
    <PageLayout
      title="Blog"
      subtitle="Latest updates and insights"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="animate-pulse space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                ))}
              </div>
            ) : (
              <BlogPosts posts={posts} />
            )}
          </div>
          <div className="lg:col-span-1">
            <BlogSidebar posts={posts} />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}