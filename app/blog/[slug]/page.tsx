"use client"

import { use } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, ChevronLeft } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"
import { generateBlogPostSchema } from "@/lib/structured-data"
import Script from "next/script"
import { getBlogPostBySlug } from "../blog-data"

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  // Unwrap the params Promise using React.use()
  const resolvedParams = use(params)
  const post = getBlogPostBySlug(resolvedParams.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="w-full py-24 md:py-24 lg:py-32 bg-[#1e376b] relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/images/pattern.svg')] bg-repeat bg-center"></div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-1/4 right-10 w-24 h-24 rounded-full bg-[#6cbdfc]/20 blur-2xl"></div>
          <div className="absolute bottom-1/4 left-10 w-32 h-32 rounded-full bg-[#8c1c40]/20 blur-3xl"></div>

          <div className="container px-4 md:px-6 relative">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-white/10 px-3 py-1 text-sm text-white">{post.category}</div>
                <h1 className="font-script text-3xl sm:text-4xl md:text-5xl text-white">{post.title}</h1>
                <div className="flex items-center justify-center gap-2 text-gray-300">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl">
              <div className="relative aspect-video overflow-hidden rounded-lg mb-8">
                <Image
                  src={post.coverImage || "/placeholder.svg"}
                  alt={post.title}
                  width={1200}
                  height={675}
                  className="object-cover w-full h-full"
                />
              </div>

              <article className="prose prose-lg max-w-none">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
              </article>

              <div className="mt-12 border-t pt-8">
                <Button variant="outline" className="flex items-center gap-2">
                  <ChevronLeft className="h-4 w-4" />
                  <Link href="/blog">Back to Blog</Link>
                </Button>
              </div>
            </div>
          </div>
          <Script
            id="blog-post-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(generateBlogPostSchema(post)) }}
          />
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

