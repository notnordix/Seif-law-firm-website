"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { FileText, Plus, Pencil, Trash2, Eye, Calendar, Tag } from "lucide-react"
import { BlogPostModal } from "@/components/admin/blog-post-modal"

type BlogPost = {
  id: string
  slug: string
  title: string
  date: string
  excerpt: string
  content: string
  coverImage: string
  category: string
  status?: "draft" | "published"
}

// Ensure the export is correct
export default function BlogPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<"add" | "edit" | "view">("add")
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  // Fetch blog posts from the API
  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/blog")

        if (!response.ok) {
          throw new Error("Failed to fetch blog posts")
        }

        const data = await response.json()

        // Add status to posts
        const formattedPosts = data.posts.map((post: any) => ({
          ...post,
          status: post.status || "published",
        }))

        setBlogPosts(formattedPosts)
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching blog posts")
        console.error("Error fetching blog posts:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  // Filter posts based on search term and active tab
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "published") return matchesSearch && post.status === "published"
    if (activeTab === "drafts") return matchesSearch && post.status === "draft"

    return matchesSearch
  })

  // Function to handle opening the modal for adding a new post
  const handleAddPost = () => {
    setSelectedPost(null)
    setModalMode("add")
    setModalOpen(true)
  }

  // Function to handle opening the modal for editing a post
  const handleEditPost = (post: BlogPost) => {
    setSelectedPost(post)
    setModalMode("edit")
    setModalOpen(true)
  }

  // Function to handle deleting a post
  const handleDeletePost = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        const response = await fetch(`/api/blog/${id}`, {
          method: "DELETE",
        })

        if (!response.ok) {
          throw new Error("Failed to delete blog post")
        }

        setBlogPosts(blogPosts.filter((post) => post.id !== id))
      } catch (err: any) {
        console.error("Error deleting blog post:", err)
        alert(err.message || "An error occurred while deleting the blog post")
      }
    }
  }

  // Function to handle saving a post (new or edited)
  const handleSavePost = async (postData: any, action: "publish" | "draft") => {
    try {
      const currentDate = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })

      if (modalMode === "add") {
        // Add new post
        const response = await fetch("/api/blog", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...postData,
            date: currentDate,
            status: action,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to create blog post")
        }

        const data = await response.json()

        // Add the new post to the state with the returned ID
        const newPost = {
          ...postData,
          id: data.id,
          date: currentDate,
          status: action,
        }

        setBlogPosts([...blogPosts, newPost])
      } else if (modalMode === "edit" && selectedPost) {
        // Update existing post
        const response = await fetch(`/api/blog/${selectedPost.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...postData,
            status: action,
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to update blog post")
        }

        // Update the post in the state
        setBlogPosts(
          blogPosts.map((post) => (post.id === selectedPost.id ? { ...postData, id: post.id, status: action } : post)),
        )
      }
    } catch (err: any) {
      console.error("Error saving blog post:", err)
      alert(err.message || "An error occurred while saving the blog post")
    }
  }

  // Function to view the post on the public site
  const handleViewOnSite = (slug: string) => {
    window.open(`/blog/${slug}`, "_blank")
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1e376b] mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading blog posts...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 p-4 rounded-md text-red-800 mb-4">{error}</div>
        <Button onClick={() => window.location.reload()} className="bg-[#1e376b] hover:bg-[#8c1c40]">
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1e376b] font-roboto">Blog Management</h1>
          <p className="text-gray-500">Create and manage blog posts</p>
        </div>
        <Button className="bg-[#1e376b] hover:bg-[#8c1c40]" onClick={handleAddPost}>
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </div>

      <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Posts</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
          </TabsList>
          <div className="relative">
            <Input
              placeholder="Search posts..."
              className="w-[200px] pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="font-roboto">All Blog Posts</CardTitle>
              <CardDescription>Showing {filteredPosts.length} posts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <div
                      key={post.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-[#1e376b] font-roboto">{post.title}</h3>
                          <Badge
                            className={
                              post.status === "published"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            }
                          >
                            {post.status === "published" ? "Published" : "Draft"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            {post.date}
                          </div>
                          <div className="flex items-center">
                            <Tag className="mr-1 h-3 w-3" />
                            {post.category}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 line-clamp-1">{post.excerpt}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-2 sm:mt-0">
                        {post.status === "published" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8"
                            onClick={() => handleViewOnSite(post.slug)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            View on Site
                          </Button>
                        )}
                        <Button variant="outline" size="sm" className="h-8" onClick={() => handleEditPost(post)}>
                          <Pencil className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-red-600"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-500">No posts found</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="published" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="font-roboto">Published Posts</CardTitle>
              <CardDescription>Posts that are live on your website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredPosts.length > 0 ? (
                  filteredPosts.map((post) => (
                    <div
                      key={post.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="space-y-1">
                        <h3 className="font-medium text-[#1e376b] font-roboto">{post.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            {post.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2 sm:mt-0">
                        <Button variant="outline" size="sm" className="h-8" onClick={() => handleViewOnSite(post.slug)}>
                          <Eye className="h-3 w-3 mr-1" />
                          View on Site
                        </Button>
                        <Button variant="outline" size="sm" className="h-8" onClick={() => handleEditPost(post)}>
                          <Pencil className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-gray-500">No published posts found</div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="drafts">
          <Card>
            <CardHeader>
              <CardTitle className="font-roboto">Draft Posts</CardTitle>
              <CardDescription>Posts that are not yet published</CardDescription>
            </CardHeader>
            <CardContent>
              {filteredPosts.length > 0 ? (
                <div className="space-y-4">
                  {filteredPosts.map((post) => (
                    <div
                      key={post.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="space-y-1">
                        <h3 className="font-medium text-[#1e376b] font-roboto">{post.title}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            {post.date}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 mt-2 sm:mt-0">
                        <Button variant="outline" size="sm" className="h-8" onClick={() => handleEditPost(post)}>
                          <Pencil className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-10 text-center text-gray-500">
                  <FileText className="mx-auto h-10 w-10 text-gray-400 mb-3" />
                  <p>No draft posts found</p>
                  <Button variant="outline" className="mt-4" onClick={handleAddPost}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create New Post
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Blog Post Modal */}
      <BlogPostModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        post={selectedPost}
        onSave={handleSavePost}
        mode={modalMode}
      />
    </div>
  )
}

