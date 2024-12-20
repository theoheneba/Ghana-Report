import React from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { BlogList } from '../../components/blog/BlogList';
import { BlogEditor } from '../../components/blog/BlogEditor';
import { useBlogPosts } from '../../hooks/useBlogPosts';

export function BlogDashboard() {
  const { posts, isLoading, error, createPost, updatePost, deletePost } = useBlogPosts();

  if (isLoading) return <AdminLayout>Loading...</AdminLayout>;
  if (error) return <AdminLayout>Error: {error}</AdminLayout>;

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Blog Management</h1>
          <BlogEditor onSave={createPost} />
        </div>
        <BlogList 
          posts={posts} 
          onUpdate={updatePost}
          onDelete={deletePost}
        />
      </div>
    </AdminLayout>
  );
}