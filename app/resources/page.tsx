import { Suspense } from 'react';
import { getAllBlogPosts } from '../../lib/blogUtils';
import ResourcesClient from './ResourcesClient';

// Get blog posts from markdown files (server-side)
const blogPosts = getAllBlogPosts();

export default function Resources() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResourcesClient blogPosts={blogPosts} />
    </Suspense>
  );
}
