import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center">
        <div className="container px-4 md:px-6 py-12 md:py-24 lg:py-32 text-center">
          <div className="mx-auto max-w-3xl space-y-4">
            <h1 className="font-script text-4xl md:text-6xl text-[#1e376b]">Page Not Found</h1>
            <p className="text-xl text-gray-500 md:text-2xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We couldn't find the page you were looking for. It might have been moved or deleted.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button className="custom-btn primary-btn">
                <Link href="/">Return Home</Link>
              </Button>
              <Button className="custom-btn primary-btn-alt">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

