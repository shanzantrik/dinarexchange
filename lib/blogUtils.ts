import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// Mark this file as server-side only
export const dynamic = 'force-dynamic';

export interface BlogPost {
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

const postsDirectory = path.join(process.cwd(), 'content/blog');

export function getAllBlogPosts(): BlogPost[] {
  // Check if the directory exists
  if (!fs.existsSync(postsDirectory)) {
    console.warn('Blog posts directory does not exist. Creating sample posts...');
    return getSampleBlogPosts();
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      // Remove ".md" from file name to get id
      const id = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

             // Combine the data with the id
       return {
         id,
         slug: id,
         featured: false, // Default value for featured
         ...(matterResult.data as Omit<BlogPost, 'id' | 'slug' | 'featured'>),
       };
    });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();

           return {
         id: slug,
         slug,
         content: contentHtml,
         featured: false, // Default value for featured
         ...(matterResult.data as Omit<BlogPost, 'id' | 'slug' | 'content' | 'featured'>),
       };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}

export function getRelatedPosts(currentPost: BlogPost, allPosts: BlogPost[], limit: number = 3): BlogPost[] {
  return allPosts
    .filter(post =>
      post.id !== currentPost.id &&
      (post.category === currentPost.category ||
       post.tags.some(tag => currentPost.tags.includes(tag)))
    )
    .slice(0, limit);
}

// Sample blog posts for when markdown files don't exist
function getSampleBlogPosts(): BlogPost[] {
  return [
    {
      id: 'imf-warns-economic-contraction-2025',
      slug: 'imf-warns-economic-contraction-2025',
      title: '📉 IMF Warns of 1.5% Economic Contraction in Iraq for 2025 — Is IQD Revaluation Becoming a Necessity?',
      excerpt: 'The International Monetary Fund (IMF) has issued a stark warning about Iraq\'s economic outlook for 2025, predicting a 1.5% economic contraction that could significantly impact the Iraqi Dinar (IQD) value and potentially accelerate revaluation discussions.',
      content: `
        <h1>IMF Warns of 1.5% Economic Contraction in Iraq for 2025</h1>

        <p>The International Monetary Fund (IMF) has issued a stark warning about Iraq's economic outlook for 2025, predicting a 1.5% economic contraction that could significantly impact the Iraqi Dinar (IQD) value and potentially accelerate revaluation discussions.</p>

        <h2>Key Findings from the IMF Report</h2>

        <p>The IMF's latest economic assessment for Iraq reveals several concerning trends:</p>

        <ul>
          <li>Projected 1.5% GDP contraction in 2025</li>
          <li>Continued pressure on oil-dependent revenue streams</li>
          <li>Potential impact on currency stability and exchange rates</li>
          <li>Increased urgency for economic diversification</li>
        </ul>

        <h2>Implications for Iraqi Dinar Revaluation</h2>

        <p>This economic contraction could serve as a catalyst for Iraqi Dinar revaluation discussions. The IMF's warning highlights the need for Iraq to:</p>

        <ol>
          <li>Strengthen economic fundamentals</li>
          <li>Diversify revenue sources beyond oil</li>
          <li>Implement structural reforms</li>
          <li>Consider currency revaluation as a strategic economic tool</li>
        </ol>

        <blockquote>
          "The economic challenges facing Iraq in 2025 may necessitate bold monetary policy decisions, including potential currency revaluation to stimulate economic growth and attract foreign investment."
        </blockquote>

        <h2>What This Means for Investors</h2>

        <p>For Iraqi Dinar investors, this IMF warning represents both challenges and opportunities:</p>

        <ul>
          <li><strong>Increased Volatility:</strong> Economic contraction may lead to currency fluctuations</li>
          <li><strong>Revaluation Pressure:</strong> Economic challenges could accelerate revaluation timelines</li>
          <li><strong>Investment Opportunities:</strong> Economic reforms may create new investment avenues</li>
          <li><strong>Risk Management:</strong> Importance of diversified investment strategies</li>
        </ul>

        <h2>Looking Ahead</h2>

        <p>While the IMF's warning is concerning, it also presents an opportunity for Iraq to implement necessary economic reforms. The potential for Iraqi Dinar revaluation remains a topic of significant interest for investors worldwide.</p>

        <p>As we monitor these developments, it's crucial for investors to stay informed about economic indicators and policy changes that could impact the Iraqi Dinar's value.</p>
      `,
      date: '2024-06-03',
      category: 'Economic Analysis',
      featured: true,
      image: '/blog/pexels-pixabay-210574.jpg',
      author: 'Dinar Exchange Team',
      readTime: '8 min read',
      tags: ['IMF', 'Economic Contraction', 'IQD Revaluation', 'Iraq Economy']
    },
    {
      id: 'benefits-regulating-iraqi-dinar',
      slug: 'benefits-regulating-iraqi-dinar',
      title: 'The Benefits of Regulating the Iraqi Dinar (IQD): A Path to Economic Stability and Growth',
      excerpt: 'Exploring how proper regulation of the Iraqi Dinar could lead to economic stability, increased investor confidence, and sustainable growth for Iraq\'s economy.',
      content: `
        <h1>The Benefits of Regulating the Iraqi Dinar (IQD)</h1>

        <p>Proper regulation of the Iraqi Dinar represents a crucial step toward economic stability and sustainable growth for Iraq's economy. This comprehensive analysis explores the potential benefits and implementation strategies.</p>

        <h2>Economic Stability Through Regulation</h2>

        <p>Regulating the Iraqi Dinar would provide several key benefits for economic stability:</p>

        <ul>
          <li>Reduced currency volatility</li>
          <li>Improved monetary policy effectiveness</li>
          <li>Enhanced financial market confidence</li>
          <li>Better inflation control mechanisms</li>
        </ul>

        <h2>Investor Confidence and Market Development</h2>

        <p>A well-regulated Iraqi Dinar would significantly boost investor confidence:</p>

        <ol>
          <li>Transparent exchange rate mechanisms</li>
          <li>Predictable monetary policy</li>
          <li>Reduced investment risks</li>
          <li>Increased foreign direct investment</li>
        </ol>

        <blockquote>
          "Regulation of the Iraqi Dinar is not just about currency stability—it's about building a foundation for long-term economic prosperity and international investment."
        </blockquote>

        <h2>Implementation Strategies</h2>

        <p>Successful regulation requires careful planning and implementation:</p>

        <ul>
          <li><strong>Central Bank Independence:</strong> Ensuring monetary policy autonomy</li>
          <li><strong>Transparent Policies:</strong> Clear communication of regulatory frameworks</li>
          <li><strong>Market Integration:</strong> Gradual integration with international markets</li>
          <li><strong>Risk Management:</strong> Robust systems for managing currency risks</li>
        </ul>

        <h2>Long-term Economic Benefits</h2>

        <p>The long-term benefits of Iraqi Dinar regulation extend beyond immediate stability:</p>

        <ul>
          <li>Sustainable economic growth</li>
          <li>Enhanced international trade capabilities</li>
          <li>Improved financial sector development</li>
          <li>Greater economic diversification opportunities</li>
        </ul>

        <h2>Conclusion</h2>

        <p>Regulating the Iraqi Dinar represents a strategic opportunity for Iraq to strengthen its economic foundation and attract international investment. The path to regulation requires careful planning, transparent implementation, and ongoing monitoring to ensure success.</p>
      `,
      date: '2024-02-28',
      category: 'Policy & Regulation',
      featured: false,
      image: '/blog/iraqi-dinar-bills.jpg',
      author: 'Dinar Exchange Team',
      readTime: '6 min read',
      tags: ['Regulation', 'Economic Stability', 'IQD Policy', 'Growth']
    }
  ];
}

// Create sample markdown files if they don't exist
export function createSampleBlogFiles() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }

  const samplePosts = getSampleBlogPosts();

  samplePosts.forEach(post => {
    const filePath = path.join(postsDirectory, `${post.slug}.md`);

    if (!fs.existsSync(filePath)) {
      const markdownContent = `---
title: "${post.title}"
excerpt: "${post.excerpt}"
date: "${post.date}"
category: "${post.category}"
featured: ${post.featured}
image: "${post.image}"
author: "${post.author}"
readTime: "${post.readTime}"
tags: ${JSON.stringify(post.tags)}
metaDescription: "${post.excerpt}"
metaKeywords: ${JSON.stringify(post.tags)}
---

${post.content.replace(/<[^>]*>/g, '')}
`;

      fs.writeFileSync(filePath, markdownContent);
    }
  });
}
