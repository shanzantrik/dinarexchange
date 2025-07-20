# Iraqi Dinar Blog System

This document explains how to use the automated blog system for the Dinar Exchange website.

## Overview

The blog system is built with Next.js 13+ and uses markdown files for content management. It features:

- **Automated Content Management**: Blog posts are stored as markdown files
- **Dynamic Routing**: Individual blog pages are generated automatically
- **SEO Optimized**: Meta tags, Open Graph, and Twitter cards are automatically generated
- **Responsive Design**: Works perfectly on all devices
- **Search and Filter**: Advanced search and category filtering
- **Related Posts**: Automatically suggests related articles

## File Structure

```
dinarexchange/
├── app/
│   ├── resources/
│   │   └── page.tsx              # Main blog listing page
│   └── blog/
│       └── [slug]/
│           └── page.tsx          # Individual blog post page
├── components/
│   └── BlogTemplate.tsx          # Blog post template component
├── lib/
│   └── blogUtils.ts              # Blog utilities and markdown processing
├── content/
│   └── blog/                     # Markdown blog posts
│       ├── imf-warns-economic-contraction-2025.md
│       ├── benefits-regulating-iraqi-dinar.md
│       └── how-to-exchange-iraqi-dinar.md
└── BLOG_SYSTEM_README.md         # This file
```

## How to Add New Blog Posts

### 1. Create a New Markdown File

Create a new `.md` file in the `content/blog/` directory with the following structure:

```markdown
---
title: "Your Blog Post Title"
excerpt: "A brief description of your blog post (2-3 sentences)"
date: "YYYY-MM-DD"
category: "Category Name"
featured: false
image: "/blog/your-image.jpg"
author: "Author Name"
readTime: "X min read"
tags: ["Tag1", "Tag2", "Tag3"]
metaDescription: "SEO description for search engines"
metaKeywords: ["Keyword1", "Keyword2", "Keyword3"]
---

# Your Blog Post Title

Your blog content goes here...

## Section 1

Content for section 1...

## Section 2

Content for section 2...

### Subsection

More detailed content...

> Important quote or highlight

## Conclusion

Wrap up your blog post...
```

### 2. Required Front Matter Fields

| Field             | Type    | Required | Description                          |
| ----------------- | ------- | -------- | ------------------------------------ |
| `title`           | string  | Yes      | The main title of the blog post      |
| `excerpt`         | string  | Yes      | Brief description (2-3 sentences)    |
| `date`            | string  | Yes      | Publication date (YYYY-MM-DD format) |
| `category`        | string  | Yes      | Blog category (see categories below) |
| `featured`        | boolean | Yes      | Whether to feature this post         |
| `image`           | string  | Yes      | Path to featured image               |
| `author`          | string  | Yes      | Author name                          |
| `readTime`        | string  | Yes      | Estimated reading time               |
| `tags`            | array   | Yes      | Array of relevant tags               |
| `metaDescription` | string  | No       | SEO description                      |
| `metaKeywords`    | array   | No       | SEO keywords                         |

### 3. Available Categories

- Market Analysis
- Economic Analysis
- Central Bank
- Government Policy
- Banking
- Oil & Energy
- International Relations
- US Relations
- Economic Policy
- Market Update
- Trading Guide
- Technology
- Historical Analysis
- Currency News
- De-Dollarization
- Compliance
- International Finance
- Political Analysis
- Global Markets
- Regional Analysis
- Federal Reserve
- Market Stability
- Financial Policy
- Regional Markets
- International Trade
- Policy & Regulation
- Trade & Exports
- Educational

### 4. Markdown Features

The blog system supports standard markdown syntax:

- **Headers**: `# H1`, `## H2`, `### H3`
- **Bold**: `**bold text**`
- **Italic**: `*italic text*`
- **Lists**: `- item` or `1. item`
- **Links**: `[text](url)`
- **Blockquotes**: `> quote`
- **Code**: `` `code` ``

## Blog Post URL Structure

Blog posts are automatically accessible at:

```
https://yourdomain.com/blog/[slug]
```

Where `[slug]` is the filename without the `.md` extension.

## Features

### 1. Resources Page (`/resources`)

- **Search Functionality**: Search by title, excerpt, category, or tags
- **Category Filtering**: Filter posts by category
- **Sorting**: Sort by date or title
- **Featured Posts**: Highlighted featured articles
- **Responsive Grid**: Beautiful card-based layout

### 2. Individual Blog Posts (`/blog/[slug]`)

- **Table of Contents**: Automatically generated from headers
- **Related Posts**: Shows related articles based on category and tags
- **Social Sharing**: Built-in social media sharing buttons
- **Author Information**: Author details and publication info
- **Tags**: Clickable tags for easy navigation
- **SEO Optimized**: Complete meta tags and Open Graph data

### 3. SEO Features

- **Meta Tags**: Title, description, and keywords
- **Open Graph**: Facebook and social media sharing
- **Twitter Cards**: Twitter-specific meta tags
- **Structured Data**: Article schema markup
- **Sitemap**: Automatic sitemap generation

## Technical Implementation

### Dependencies

The blog system uses these npm packages:

- `gray-matter`: Parse front matter from markdown files
- `remark`: Markdown processing
- `remark-html`: Convert markdown to HTML

### Key Functions

#### `getAllBlogPosts()`

Returns all blog posts sorted by date (newest first).

#### `getBlogPostBySlug(slug)`

Returns a specific blog post by its slug.

#### `getRelatedPosts(currentPost, allPosts, limit)`

Returns related posts based on category and tag matching.

## Styling and Customization

### Color Scheme

The blog system uses the global color scheme:

- **Primary Blue**: `primary-500` (#3B82F6)
- **Orange**: `orange-500` (#F97316)
- **Gradients**: Blue to orange gradients throughout

### Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet**: Responsive grid layouts
- **Desktop**: Full-width layouts with sidebar navigation

### Animations

- **Fade In**: Smooth fade-in animations for content
- **Hover Effects**: Interactive hover states
- **Transitions**: Smooth transitions between states

## Best Practices

### Content Guidelines

1. **Write Clear Titles**: Make titles descriptive and engaging
2. **Use Proper Headers**: Structure content with H1, H2, H3 headers
3. **Include Images**: Add relevant images for visual appeal
4. **Write Good Excerpts**: Keep excerpts concise but informative
5. **Use Tags Wisely**: Add relevant tags for better discoverability

### SEO Guidelines

1. **Optimize Titles**: Include relevant keywords in titles
2. **Write Meta Descriptions**: Create compelling meta descriptions
3. **Use Keywords**: Include relevant keywords in content and tags
4. **Internal Linking**: Link to other relevant blog posts
5. **Image Alt Text**: Add descriptive alt text to images

### Technical Guidelines

1. **File Naming**: Use descriptive, URL-friendly filenames
2. **Date Format**: Always use YYYY-MM-DD format for dates
3. **Image Paths**: Use consistent image paths starting with `/blog/`
4. **Content Length**: Aim for 500-2000 words per post
5. **Regular Updates**: Publish content regularly for better SEO

## Troubleshooting

### Common Issues

1. **Post Not Appearing**: Check file naming and front matter
2. **Images Not Loading**: Verify image paths and file existence
3. **Build Errors**: Check markdown syntax and front matter format
4. **SEO Issues**: Verify meta tags and structured data

### Performance Optimization

1. **Image Optimization**: Compress images before uploading
2. **Content Caching**: Enable Next.js caching for better performance
3. **Code Splitting**: Blog posts are automatically code-split
4. **Lazy Loading**: Images are lazy-loaded for better performance

## Support

For technical support or questions about the blog system, please contact the development team.

---

**Last Updated**: December 2024
**Version**: 1.0.0
