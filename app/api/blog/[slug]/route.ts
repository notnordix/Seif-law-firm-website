import { type NextRequest, NextResponse } from "next/server"
import { queryRow } from "@/lib/db"

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug

    const sql = `
      SELECT 
        p.id, 
        p.title, 
        p.slug, 
        p.excerpt, 
        p.content, 
        p.cover_image_filename as coverImage, 
        p.status,
        DATE_FORMAT(p.published_at, '%M %d, %Y') as date,
        c.name as category
      FROM blog_posts p
      LEFT JOIN blog_categories c ON p.category_id = c.id
      WHERE p.slug = ? AND p.status = 'published'
    `

    const post = await queryRow(sql, [slug])

    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json({ post })
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 })
  }
}

