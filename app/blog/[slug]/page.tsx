import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getAllBlogPosts, getRelatedPosts } from '../../../lib/blogUtils';
import BlogTemplate from '../../../components/BlogTemplate';

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPageProps) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: post.title,
    description: post.metaDescription || post.excerpt,
    keywords: post.metaKeywords || post.tags,
    openGraph: {
      title: post.title,
      description: post.metaDescription || post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription || post.excerpt,
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllBlogPosts();
  const relatedPosts = getRelatedPosts(post, allPosts, 3);

  return <BlogTemplate post={post} relatedPosts={relatedPosts} />;
}
