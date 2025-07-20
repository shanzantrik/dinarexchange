# Blog Images Directory

This directory contains images for blog posts. Each blog post can reference an image using the `image` field in its front matter.

## Image Naming Convention

Images should be named to match the blog post slug:

- `imf-economic-contraction-2025.jpg` - for the IMF economic contraction post
- `benefits-regulating-iraqi-dinar.jpg` - for the regulation benefits post
- `how-to-exchange-iraqi-dinar.jpg` - for the exchange guide post
- `iraq-currency-exchange-practices.jpg` - for the best practices post
- `future-iraqi-dinar-digital-banking.jpg` - for the digital banking post
- `regional-conflicts-iraqi-dinar.jpg` - for the regional conflicts post

## Image Requirements

- **Format**: JPG, PNG, or WebP
- **Size**: Recommended 1200x630px for optimal display
- **File Size**: Keep under 500KB for fast loading
- **Quality**: High quality, professional images related to the blog content

## Adding Images

1. Place your image file in this directory
2. Name it according to the convention above
3. Update the blog post's front matter to include the image path
4. The image will automatically display in both the blog listing and individual blog pages

## Fallback

If an image is not found or fails to load, the system will automatically show a placeholder with a gradient background and an emoji icon.

## Example Front Matter

```yaml
---
title: "Your Blog Title"
slug: "your-blog-slug"
date: "2025-01-01"
author: "Author Name"
category: "Category"
tags: ["tag1", "tag2"]
excerpt: "Your excerpt here"
readTime: "5 min read"
featured: false
image: "/blog/your-blog-slug.jpg"
---
```
