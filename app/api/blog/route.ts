import { type NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get("category")
    const slug = searchParams.get("slug")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const offset = (page - 1) * limit

    let sql = `
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
      WHERE 1=1
    `

    const params: any[] = []

    if (slug) {
      sql += " AND p.slug = ?"
      params.push(slug)
    }

    if (category) {
      sql += " AND c.slug = ?"
      params.push(category)
    }

    // Check if we need to filter by status
    const session = await getServerSession(authOptions)
    if (!session) {
      // If not authenticated, only show published posts
      sql += ' AND p.status = "published"'
    }

    sql += " ORDER BY p.published_at DESC LIMIT ? OFFSET ?"
    params.push(limit, offset)

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
    const { title, slug, excerpt, content, category, status, coverImage } = data

    // Validate required fields
    if (!title || !slug || !excerpt || !content || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get category ID
    const categoryResult = (await query("SELECT id FROM blog_categories WHERE name = ?", [category])) as any[]

    if (!categoryResult.length) {
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
        cover_image_filename,
        status,
        author_id,
        published_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ${status === "published" ? "CURRENT_TIMESTAMP" : "NULL"})
    `

    const result = await query(sql, [
      title,
      slug,
      excerpt,
      content,
      categoryResult[0].id,
      coverImage || "/images/blog-post1.jpg", // Default image if none provided
      status || "draft",
      session.user.id,
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

