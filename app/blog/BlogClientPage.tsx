"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, ChevronRight, Search } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { getAllBlogPosts } from "./blog-data"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function BlogClientPage() {
  const blogPosts = getAllBlogPosts()

  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6
  const totalPages = Math.ceil(blogPosts.length / postsPerPage)

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost)

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
                <div className="inline-block rounded-lg bg-white/10 px-3 py-1 text-sm text-white">Our Blog</div>
                <h1 className="font-script text-3xl sm:text-4xl md:text-5xl text-white">Legal Insights & Updates</h1>
                <p className="max-w-[700px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Stay informed with our latest articles on legal topics, case studies, and industry trends.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-5xl">
              <div className="flex flex-col md:flex-row gap-8 mb-12">
                <div className="w-full md:w-2/3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                    <input
                      type="search"
                      placeholder="Search articles..."
                      className="w-full rounded-md border border-gray-200 pl-10 py-2 text-sm outline-none focus:border-[#6cbdfc] focus:ring-1 focus:ring-[#6cbdfc]"
                    />
                  </div>
                </div>
                <div className="w-full md:w-1/3">
                  <select className="w-full rounded-md border border-gray-200 py-2 text-sm outline-none focus:border-[#6cbdfc] focus:ring-1 focus:ring-[#6cbdfc]">
                    <option value="">All Categories</option>
                    <option value="business-law">Business Law</option>
                    <option value="commercial-litigation">Commercial Litigation</option>
                    <option value="dispute-resolution">Dispute Resolution</option>
                    <option value="legal-tips">Legal Tips</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 py-12">
                {currentPosts.map((post) => (
                  <Link href={`/blog/${post.slug}`} key={post.id} className="block">
                    <div className="blog-card group relative rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
                      <div className="card-border absolute inset-0 rounded-lg"></div>
                      <Card className="h-full bg-transparent border-none overflow-hidden">
                        <div className="relative h-48 w-full">
                          <Image
                            src={post.coverImage || "/placeholder.svg"}
                            alt={post.title}
                            width={400}
                            height={200}
                            className="object-cover w-full h-full"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            loading="lazy"
                          />
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                            <Calendar className="h-4 w-4" />
                            <span>{post.date}</span>
                          </div>
                          <h3 className="card-title-script text-[#1e376b] mb-2">{post.title}</h3>
                          <p className="text-sm text-gray-500 mb-4">{post.excerpt}</p>
                          <div className="flex items-center text-[#8c1c40] group-hover:text-[#6cbdfc] text-sm font-medium">
                            Read More <ChevronRight className="h-4 w-4 ml-1" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="flex justify-center">
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <Button
                      key={number}
                      variant="outline"
                      className={cn(
                        "w-10 h-10 p-0 rounded-md transition-colors duration-300",
                        currentPage === number
                          ? "bg-[#6cbdfc] text-white border-[#6cbdfc]"
                          : "hover:bg-[#6cbdfc] hover:text-white hover:border-[#6cbdfc]",
                      )}
                      onClick={() => setCurrentPage(number)}
                    >
                      {number}
                    </Button>
                  ))}
                  {totalPages > 3 && currentPage < totalPages - 1 && <span className="mx-2">...</span>}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

