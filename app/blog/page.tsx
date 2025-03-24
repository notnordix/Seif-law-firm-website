import type { Metadata } from "next"
import { query } from "@/lib/db"
import BlogClientPage from "./BlogClientPage"

export const metadata: Metadata = {
  title: "Blog - Legal Insights & Updates",
  description: "Stay informed with the latest legal insights, industry updates, and expert advice from Seif Law Firm.",
  alternates: {
    canonical: "https://seiflawfirm.com/blog",
  },
}

async function getBlogPosts() {
  try {
    const sql = `
      SELECT 
        p.id, 
        p.title, 
        p.slug, 
        p.excerpt, 
        p.cover_image_filename as coverImage, 
        DATE_FORMAT(p.published_at, '%M %d, %Y') as date,
        c.name as category
      FROM blog_posts p
      LEFT JOIN blog_categories c ON p.category_id = c.id
      WHERE p.status = 'published'
      ORDER BY p.published_at DESC
    `

    const posts = await query(sql)
    return posts
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return <BlogClientPage />
}

