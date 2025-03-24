import { type NextRequest, NextResponse } from "next/server"
import { query, queryRow } from "@/lib/db"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    // Await the params
    const resolvedParams = await params
    const slug = resolvedParams.slug

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

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Await the params
    const resolvedParams = await params
    const slug = resolvedParams.slug

    const data = await req.json()
    const { title, slug: newSlug, excerpt, content, category, status } = data

    // Validate required fields
    if (!title || !newSlug || !excerpt || !content || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get category ID
    const categoryResult = await queryRow("SELECT id FROM blog_categories WHERE name = ?", [category])

    if (!categoryResult) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 })
    }

    // Update blog post
    const sql = `
      UPDATE blog_posts
      SET 
        title = ?, 
        slug = ?, 
        excerpt = ?, 
        content = ?, 
        category_id = ?, 
        status = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE slug = ?
    `

    await query(sql, [title, newSlug, excerpt, content, categoryResult.id, status || "draft", slug])

    return NextResponse.json({
      success: true,
      message: "Blog post updated successfully",
    })
  } catch (error) {
    console.error("Error updating blog post:", error)
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Await the params
    const resolvedParams = await params
    const slug = resolvedParams.slug

    // Delete blog post
    await query("DELETE FROM blog_posts WHERE slug = ?", [slug])

    return NextResponse.json({
      success: true,
      message: "Blog post deleted successfully",
    })
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 })
  }
}

