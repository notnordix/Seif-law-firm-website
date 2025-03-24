"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Calendar, ImageIcon, X, Check } from "lucide-react"

type BlogPost = {
  id?: string
  title: string
  slug: string
  excerpt: string
  content: string
  category: string
  coverImage: string
  date?: string
  status?: "draft" | "published"
}

interface BlogPostModalProps {
  isOpen: boolean
  onClose: () => void
  post?: BlogPost | null
  onSave: (post: BlogPost, action: "publish" | "draft") => void
  mode: "add" | "edit" | "view"
}

export function BlogPostModal({ isOpen, onClose, post, onSave, mode }: BlogPostModalProps) {
  const [formData, setFormData] = useState<BlogPost>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    coverImage: "",
    status: "draft",
  })

  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [previewMode, setPreviewMode] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [submitAction, setSubmitAction] = useState<"publish" | "draft">("publish")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Initialize form data when post changes
  useEffect(() => {
    if (post) {
      setFormData({
        ...post,
      })
      setImagePreview(post.coverImage)
    } else {
      setFormData({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        category: "",
        coverImage: "",
        status: "draft",
      })
      setImagePreview(null)
    }
    // Reset errors, preview mode, and form submitted state
    setFormErrors({})
    setPreviewMode(false)
    setFormSubmitted(false)
  }, [post])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))

    // Clear error for this field when user starts typing
    if (formErrors[id]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[id]
        return newErrors
      })
    }
  }

  const handleSlugify = () => {
    if (formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/--+/g, "-")
        .trim()

      setFormData((prev) => ({ ...prev, slug }))

      // Clear slug error if it exists
      if (formErrors.slug) {
        setFormErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors.slug
          return newErrors
        })
      }
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload this file to your server or a storage service
      // For now, we'll just create a local URL for preview
      const imageUrl = URL.createObjectURL(file)
      setImagePreview(imageUrl)

      // In a real app, you would set the actual URL returned from your server
      // For this demo, we'll just use a placeholder path
      setFormData((prev) => ({
        ...prev,
        coverImage: `/images/${file.name}`,
      }))

      // Clear error if it exists
      if (formErrors.coverImage) {
        setFormErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors.coverImage
          return newErrors
        })
      }
    }
  }

  const triggerImageUpload = () => {
    fileInputRef.current?.click()
  }

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}

    if (!formData.title.trim()) {
      errors.title = "Title is required"
    }

    if (!formData.slug.trim()) {
      errors.slug = "Slug is required"
    }

    if (!formData.excerpt.trim()) {
      errors.excerpt = "Excerpt is required"
    }

    if (!formData.content.trim()) {
      errors.content = "Content is required"
    }

    if (!formData.category) {
      errors.category = "Category is required"
    }

    if (!formData.coverImage && !imagePreview) {
      errors.coverImage = "Cover image is required"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = (action: "publish" | "draft") => {
    setSubmitAction(action)

    if (!validateForm()) {
      return
    }

    if (mode === "add") {
      setFormSubmitted(true)

      // In a real app, you would wait for the server response
      setTimeout(() => {
        onSave(formData, action)
        setFormSubmitted(false)
        onClose()
      }, 2000)
    } else {
      onSave(formData, action)
      onClose()
    }
  }

  const isViewOnly = mode === "view"
  const title = mode === "add" ? "Create New Blog Post" : mode === "edit" ? "Edit Blog Post" : "View Blog Post"

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden rounded-lg max-h-[95vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-[#1e376b] to-[#2a4a8e] text-white p-4 flex justify-between items-center sticky top-0 z-10">
          <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
          <div className="flex gap-2">
            {!isViewOnly && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPreviewMode(!previewMode)}
                className="text-white hover:bg-white/20 h-8"
              >
                {previewMode ? "Edit" : "Preview"}
              </Button>
            )}
            <Button variant="ghost" className="h-7 w-7 p-0 text-white hover:bg-white/10 rounded-full" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {formSubmitted ? (
          <div className="p-5 flex flex-col items-center justify-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-base font-semibold text-[#1e376b] mb-2">
              Post {submitAction === "publish" ? "Published" : "Saved as Draft"}
            </h3>
            <p className="text-gray-500 text-center text-sm">
              Your blog post has been successfully {submitAction === "publish" ? "published" : "saved as a draft"}.
            </p>
          </div>
        ) : (
          <div className="overflow-y-auto" style={{ maxHeight: "calc(90vh - 120px)" }}>
            {previewMode ? (
              <div className="p-5 space-y-4">
                <div className="aspect-video w-full overflow-hidden rounded-md bg-gray-100 relative">
                  {imagePreview ? (
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt={formData.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <ImageIcon className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-[#1e376b]">{formData.title}</h2>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      {formData.category || "Uncategorized"}
                    </span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                </div>

                <p className="text-gray-700 italic border-l-4 border-gray-200 pl-4 py-2 bg-gray-50">
                  {formData.excerpt}
                </p>

                <div className="prose max-w-none">
                  {formData.content
                    .split("\n")
                    .map((paragraph, index) => (paragraph ? <p key={index}>{paragraph}</p> : <br key={index} />))}
                </div>
              </div>
            ) : (
              <div className="p-6 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Title {!isViewOnly && <span className="text-red-500">*</span>}
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={handleChange}
                    onBlur={handleSlugify}
                    disabled={isViewOnly}
                    required
                    placeholder="Enter post title"
                    className={formErrors.title ? "border-red-500 focus-visible:ring-red-500" : ""}
                  />
                  {formErrors.title && <p className="text-red-500 text-xs mt-1">{formErrors.title}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="slug" className="text-sm font-medium flex justify-between">
                      <span>Slug {!isViewOnly && <span className="text-red-500">*</span>}</span>
                      {!isViewOnly && (
                        <button
                          type="button"
                          onClick={handleSlugify}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          Generate from title
                        </button>
                      )}
                    </Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={handleChange}
                      disabled={isViewOnly}
                      required
                      placeholder="post-url-slug"
                      className={formErrors.slug ? "border-red-500 focus-visible:ring-red-500" : ""}
                    />
                    {formErrors.slug && <p className="text-red-500 text-xs mt-1">{formErrors.slug}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-sm font-medium">
                      Category {!isViewOnly && <span className="text-red-500">*</span>}
                    </Label>
                    <select
                      id="category"
                      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                        formErrors.category ? "border-red-500 focus-visible:ring-red-500" : ""
                      }`}
                      value={formData.category}
                      onChange={handleChange}
                      disabled={isViewOnly}
                      required
                    >
                      <option value="">Select a category</option>
                      <option value="Business Law">Business Law</option>
                      <option value="Commercial Litigation">Commercial Litigation</option>
                      <option value="Dispute Resolution">Dispute Resolution</option>
                      <option value="Legal Tips">Legal Tips</option>
                    </select>
                    {formErrors.category && <p className="text-red-500 text-xs mt-1">{formErrors.category}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt" className="text-sm font-medium">
                    Excerpt {!isViewOnly && <span className="text-red-500">*</span>}
                  </Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={handleChange}
                    disabled={isViewOnly}
                    required
                    placeholder="Brief summary of the post"
                    className={cn(
                      "resize-none h-20",
                      formErrors.excerpt ? "border-red-500 focus-visible:ring-red-500" : "",
                    )}
                  />
                  {formErrors.excerpt && <p className="text-red-500 text-xs mt-1">{formErrors.excerpt}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content" className="text-sm font-medium">
                    Content {!isViewOnly && <span className="text-red-500">*</span>}
                  </Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={handleChange}
                    className={cn(
                      "min-h-[150px] max-h-[300px]",
                      formErrors.content ? "border-red-500 focus-visible:ring-red-500" : "",
                    )}
                    disabled={isViewOnly}
                    required
                    placeholder="Write your blog post content here..."
                  />
                  {formErrors.content && <p className="text-red-500 text-xs mt-1">{formErrors.content}</p>}
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Cover Image {!isViewOnly && <span className="text-red-500">*</span>}
                  </Label>

                  {!isViewOnly && (
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={triggerImageUpload}
                        className="flex items-center gap-2"
                      >
                        <ImageIcon className="h-4 w-4" />
                        Upload Image
                      </Button>
                      <span className="text-xs text-gray-500">
                        {formData.coverImage ? formData.coverImage.split("/").pop() : "No file selected"}
                      </span>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </div>
                  )}

                  {formErrors.coverImage && <p className="text-red-500 text-xs mt-1">{formErrors.coverImage}</p>}

                  {imagePreview && (
                    <div className="mt-2 border rounded-md p-2 bg-gray-50">
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-xs text-gray-500">Image Preview:</p>
                        {!isViewOnly && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-5 w-5 p-0 text-gray-500 hover:text-red-500"
                            onClick={() => {
                              setImagePreview(null)
                              setFormData((prev) => ({ ...prev, coverImage: "" }))
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Cover preview"
                        className="max-h-32 object-cover rounded-md mx-auto"
                      />
                    </div>
                  )}
                </div>

                {(mode === "edit" || mode === "view") && (
                  <div className="space-y-2">
                    <Label htmlFor="status" className="text-sm font-medium">
                      Status
                    </Label>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        formData.status === "published"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {formData.status === "published" ? "Published" : "Draft"}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {!formSubmitted && (
          <div className="border-t px-6 py-4 bg-gray-50 flex justify-between">
            <div>
              {!isViewOnly && !previewMode && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleSubmit("draft")}
                  className="text-yellow-600 border-yellow-600 hover:bg-yellow-50"
                >
                  Save as Draft
                </Button>
              )}
            </div>

            <div className="flex gap-2">
              <Button type="button" variant="outline" onClick={onClose}>
                {isViewOnly ? "Close" : "Cancel"}
              </Button>

              {!isViewOnly && !previewMode && (
                <Button
                  type="button"
                  className="bg-[#1e376b] hover:bg-[#8c1c40] transition-colors"
                  onClick={() => handleSubmit("publish")}
                >
                  {mode === "add" ? "Publish Post" : "Update Post"}
                </Button>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

