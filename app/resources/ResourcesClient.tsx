'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { BlogPost } from '../../lib/blogUtils';

interface ResourcesClientProps {
  blogPosts: BlogPost[];
}

export default function ResourcesClient({ blogPosts }: ResourcesClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('date');

  // Filter and sort posts
  const filteredPosts = useMemo(() => {
    let filtered = blogPosts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort posts
    switch (sortBy) {
      case 'date':
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'category':
        filtered.sort((a, b) => a.category.localeCompare(b.category));
        break;
      default:
        break;
    }

    return filtered;
  }, [blogPosts, searchTerm, selectedCategory, sortBy]);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))];
    return cats;
  }, [blogPosts]);

  // Get latest posts for sidebar
  const latestPosts = useMemo(() => {
    return blogPosts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }, [blogPosts]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-primary-600 to-orange-600 text-white">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Resources & Insights
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Stay informed with the latest news, analysis, and insights about the Iraqi Dinar and global currency markets.
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 px-6 bg-white border-b">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>

              {/* Sort Filter */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="date">Sort by Date</option>
                <option value="title">Sort by Title</option>
                <option value="category">Sort by Category</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content with Sidebar */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content - Blog Grid */}
            <div className="lg:col-span-3">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                  <p className="text-gray-600">Try adjusting your search terms or category filter.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredPosts.map((post: BlogPost, index: number) => (
                    <article
                      key={post.id}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="relative h-48">
                        {post.image ? (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              // Fallback to placeholder if image fails to load
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                        ) : null}
                        <div className={`w-full h-full bg-gradient-to-br from-primary-100 to-orange-100 flex items-center justify-center ${post.image ? 'hidden' : ''}`}>
                          <div className="text-center">
                            <div className="text-4xl mb-2">📰</div>
                            <p className="text-sm font-semibold text-gray-700">Blog Image</p>
                          </div>
                        </div>
                        <div className="absolute top-4 left-4">
                          <span className="bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            {post.category}
                          </span>
                        </div>
                        <div className="absolute top-4 right-4">
                          <span className="bg-black/60 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            {formatDate(post.date)}
                          </span>
                        </div>
                        {post.featured && (
                          <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
                            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                              Featured
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span className="text-sm text-gray-500">{post.readTime}</span>
                          </div>
                          <span className="text-sm text-gray-500">{post.author}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 2).map((tag: string, idx: number) => (
                              <span key={idx} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="text-primary-500 hover:text-primary-600 font-semibold text-sm transition-colors duration-200"
                          >
                            Read More →
                          </Link>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Latest Blogs */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Latest Blogs</h3>
                  <div className="space-y-4">
                    {latestPosts.map((post: BlogPost) => (
                      <div key={post.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                        <Link
                          href={`/blog/${post.slug}`}
                          className="block hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200"
                        >
                          <h4 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2">
                            {post.title}
                          </h4>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{formatDate(post.date)}</span>
                            <span>{post.readTime}</span>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link
                      href="/resources"
                      className="text-primary-500 hover:text-primary-600 font-semibold text-sm transition-colors duration-200"
                    >
                      View All Blogs →
                    </Link>
                  </div>
                </div>

                {/* Buy Dinar CTA */}
                <div className="bg-gradient-to-br from-primary-500 to-orange-500 rounded-xl shadow-lg p-6 text-white">
                  <div className="text-center">
                    <div className="text-4xl mb-4">💰</div>
                    <h3 className="text-xl font-bold mb-3">Buy Iraqi Dinar</h3>
                    <p className="text-white/90 text-sm mb-6">
                      Secure, authentic Iraqi Dinar notes with guaranteed authenticity and competitive rates.
                    </p>
                    <div className="space-y-3">
                      <Link
                        href="/buy-dinar"
                        className="block w-full bg-white text-primary-500 px-6 py-3 rounded-xl hover:bg-gray-100 transition-colors duration-200 font-semibold text-center"
                      >
                        Buy Iraqi Dinar
                      </Link>
                      <Link
                        href="/rates"
                        className="block w-full bg-transparent border-2 border-white text-white px-6 py-3 rounded-xl hover:bg-white hover:text-primary-500 transition-colors duration-200 font-semibold text-center"
                      >
                        View Rates
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Quick Contact */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Our experts are here to help you with any questions about Iraqi Dinar investment.
                  </p>
                  <div className="space-y-3">
                    <Link
                      href="/contact"
                      className="block w-full bg-primary-500 text-white px-6 py-3 rounded-xl hover:bg-primary-600 transition-colors duration-200 font-semibold text-center"
                    >
                      Contact Us
                    </Link>
                    <Link
                      href="/faq"
                      className="block w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-colors duration-200 font-semibold text-center"
                    >
                      View FAQ
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-12 px-6 bg-gradient-to-r from-primary-50 to-orange-50">
        <div className="container mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-8">
              Get the latest insights and analysis about the Iraqi Dinar delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <button className="px-8 py-3 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors duration-200 font-semibold">
                Subscribe
              </button>
            </div>
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
      `}</style>
    </div>
  );
}
