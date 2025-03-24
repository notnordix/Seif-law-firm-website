import { type NextRequest, NextResponse } from "next/server"
import { query, queryRow } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")

    let sql = `
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
    `

    const params: any[] = []

    if (category) {
      sql += " AND c.slug = ?"
      params.push(category)
    }

    sql += " ORDER BY p.published_at DESC"

    const posts = await query(sql, params)

    return NextResponse.json({ posts })
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await req.json()
    const { title, slug, excerpt, content, category, status } = data

    // Validate required fields
    if (!title || !slug || !excerpt || !content || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if slug already exists
    const existingPost = await queryRow("SELECT id FROM blog_posts WHERE slug = ?", [slug])

    if (existingPost) {
      return NextResponse.json({ error: "A post with this slug already exists" }, { status: 400 })
    }

    // Get category ID
    const categoryResult = await queryRow("SELECT id FROM blog_categories WHERE name = ?", [category])

    if (!categoryResult) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 })
    }

    // Insert blog post
    const sql = `
      INSERT INTO blog_posts (
        title, 
        slug, 
        excerpt, 
        content, 
        category_id, 
        author_id,
        status,
        published_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `

    const result = await query(sql, [
      title,
      slug,
      excerpt,
      content,
      categoryResult.id,
      1, // Default author ID
      status || "draft",
      status === "published" ? new Date() : null,
    ])

    return NextResponse.json({
      success: true,
      message: "Blog post created successfully",
      id: (result as any).insertId,
    })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}

