'use client';
import { useState } from 'react';
import Link from 'next/link';


interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  featured: boolean;
  image: string;
  author: string;
  readTime: string;
  tags: string[];
  metaDescription?: string;
  metaKeywords?: string[];
}

interface BlogTemplateProps {
  post: BlogPost;
  relatedPosts?: BlogPost[];
}

export default function BlogTemplate({ post, relatedPosts = [] }: BlogTemplateProps) {
  const [isTableOfContentsOpen, setIsTableOfContentsOpen] = useState(false);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatReadTime = (readTime: string) => {
    return readTime;
  };

  const generateTableOfContents = (content: string) => {
    const headings = content.match(/^#{1,3}\s+(.+)$/gm);
    if (!headings) return [];

    return headings.map((heading, index) => {
      const level = heading.match(/^(#{1,3})/)?.[1].length || 1;
      const text = heading.replace(/^#{1,3}\s+/, '');
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');

      return { id, text, level, index };
    });
  };

  const tableOfContents = generateTableOfContents(post.content);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-primary-50 to-orange-50">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary-500 via-primary-500 to-orange-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>

        <div className="relative container mx-auto max-w-4xl">
          <div className="mb-6">
            <Link
              href="/resources"
              className="inline-flex items-center text-white/80 hover:text-white transition-colors duration-200 mb-4"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Resources
            </Link>
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-white/90 animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <span>{post.author}</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>{formatDate(post.date)}</span>
            </div>
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span>{formatReadTime(post.readTime)}</span>
            </div>
          </div>
        </div>
      </section>



      {/* Main Content */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Table of Contents */}
            {tableOfContents.length > 0 && (
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Table of Contents</h3>
                    <nav className="space-y-2">
                      {tableOfContents.map((item) => (
                        <a
                          key={item.id}
                          href={`#${item.id}`}
                          className={`block text-sm transition-colors duration-200 hover:text-primary-500 ${
                            item.level === 1 ? 'font-semibold text-gray-900' :
                            item.level === 2 ? 'font-medium text-gray-700 ml-4' :
                            'text-gray-600 ml-8'
                          }`}
                        >
                          {item.text}
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
            )}

            {/* Article Content */}
            <div className={`${tableOfContents.length > 0 ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
              <article className="bg-white rounded-2xl shadow-lg p-8">
                {/* Featured Image */}
                <div className="mb-8">
                  {post.image ? (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-64 md:h-80 object-cover rounded-xl"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                  <div className={`w-full h-64 md:h-80 bg-gradient-to-br from-primary-100 to-orange-100 rounded-xl flex items-center justify-center ${post.image ? 'hidden' : ''}`}>
                    <div className="text-center">
                      <div className="text-6xl mb-4">📰</div>
                      <p className="text-lg font-semibold text-gray-700">Blog Featured Image</p>
                    </div>
                  </div>
                </div>

                {/* Article Meta */}
                <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-gray-200">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {post.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold text-gray-900">{post.author}</p>
                      <p className="text-sm text-gray-600">{formatDate(post.date)}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm">{formatReadTime(post.readTime)}</span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="prose prose-lg max-w-none">
                  <div
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                  />
                </div>

                {/* Tags */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-primary-100 hover:text-primary-700 transition-colors duration-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Share this article:</h4>
                  <div className="flex gap-3">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm">
                      Facebook
                    </button>
                    <button className="bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition-colors duration-200 text-sm">
                      Twitter
                    </button>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm">
                      WhatsApp
                    </button>
                    <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200 text-sm">
                      Email
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="py-12 px-6 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold mb-8 text-gray-900">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.slice(0, 3).map((relatedPost, index) => (
                <article
                  key={relatedPost.id}
                  className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="mb-4">
                    <span className="bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      {relatedPost.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {relatedPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{formatDate(relatedPost.date)}</span>
                    <Link
                      href={`/blog/${relatedPost.slug}`}
                      className="text-primary-500 hover:text-primary-600 font-semibold text-sm transition-colors duration-200"
                    >
                      Read More →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Call to Action */}
      <section className="py-16 px-6 bg-gradient-to-r from-primary-500 via-primary-500 to-orange-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>

        <div className="relative container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Informed</h2>
          <p className="text-xl mb-8 opacity-90">
            Get the latest Iraqi Dinar news and market updates delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button className="bg-white text-primary-500 font-bold py-3 px-8 rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        :global(.prose h1) {
          color: #1f2937;
          font-size: 2.25rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        :global(.prose h2) {
          color: #1f2937;
          font-size: 1.875rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        :global(.prose h3) {
          color: #1f2937;
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.25rem;
          margin-bottom: 0.5rem;
        }
        :global(.prose p) {
          margin-bottom: 1rem;
          line-height: 1.75;
        }
        :global(.prose ul) {
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }
        :global(.prose ol) {
          margin-bottom: 1rem;
          padding-left: 1.5rem;
        }
        :global(.prose li) {
          margin-bottom: 0.25rem;
        }
        :global(.prose blockquote) {
          border-left: 4px solid #3b82f6;
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: #6b7280;
        }
        :global(.prose code) {
          background-color: #f3f4f6;
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-size: 0.875rem;
        }
        :global(.prose pre) {
          background-color: #1f2937;
          color: #f9fafb;
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        :global(.prose a) {
          color: #3b82f6;
          text-decoration: underline;
        }
        :global(.prose a:hover) {
          color: #2563eb;
        }
      `}</style>
    </div>
  );
}
