"use client"

import type React from "react"

type Props = {
  params: Promise<{ slug: string }>
  children: React.ReactNode
}

export default function BlogPostLayout({ params, children }: Props) {
  // We don't need to use the params here, just pass them to the children
  return <>{children}</>
}

