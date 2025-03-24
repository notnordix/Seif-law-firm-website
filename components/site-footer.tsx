import Link from "next/link"
import { Scale } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="w-full border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <div className="flex items-center gap-2">
          <Scale className="h-5 w-5 text-[#1e376b]" />
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Seif Law Firm. All rights reserved.</p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="#" className="text-sm text-gray-500 hover:text-[#6cbdfc]">
            Privacy Policy
          </Link>
          <Link href="#" className="text-sm text-gray-500 hover:text-[#6cbdfc]">
            Terms of Service
          </Link>
          <Link
            href="https://www.linkedin.com/in/ayoub-seif-el-islam-6637aa196/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-500 hover:text-[#6cbdfc]"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  )
}

