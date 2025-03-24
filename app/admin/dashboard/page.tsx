"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, FileText, Users, ArrowUp, ArrowDown } from "lucide-react"
import { useEffect, useState } from "react"

export default function DashboardPage() {
  const [isClient, setIsClient] = useState(false)

  // This ensures the component only renders fully on the client
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <div className="p-6">Loading dashboard...</div>
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1e376b] font-roboto">Dashboard</h1>
        <p className="text-gray-500">Welcome to your admin dashboard</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 font-roboto">Appointments</p>
                <h3 className="text-2xl font-bold text-[#1e376b] mt-1 font-roboto">24</h3>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  <span>12% from last month</span>
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-[#6cbdfc]/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-[#6cbdfc]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 font-roboto">Blog Posts</p>
                <h3 className="text-2xl font-bold text-[#1e376b] mt-1 font-roboto">6</h3>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  <span>2 new this month</span>
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-[#6cbdfc]/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-[#6cbdfc]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 font-roboto">Clients</p>
                <h3 className="text-2xl font-bold text-[#1e376b] mt-1 font-roboto">42</h3>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <ArrowUp className="h-3 w-3 mr-1" />
                  <span>8% from last month</span>
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-[#6cbdfc]/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-[#6cbdfc]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 font-roboto">Conversion Rate</p>
                <h3 className="text-2xl font-bold text-[#1e376b] mt-1 font-roboto">68%</h3>
                <p className="text-xs text-red-600 flex items-center mt-1">
                  <ArrowDown className="h-3 w-3 mr-1" />
                  <span>3% from last month</span>
                </p>
              </div>
              <div className="h-12 w-12 rounded-full bg-[#6cbdfc]/10 flex items-center justify-center">
                <svg className="h-6 w-6 text-[#6cbdfc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 mt-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-roboto">Recent Appointments</CardTitle>
            <CardDescription>Latest appointment bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-[#1e376b]">Client Name {i}</p>
                    <p className="text-sm text-gray-500">March {i + 20}, 2024 • 10:00 AM</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Confirmed</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-roboto">Recent Blog Posts</CardTitle>
            <CardDescription>Latest published articles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <p className="font-medium text-[#1e376b]">Blog Post Title {i}</p>
                    <p className="text-sm text-gray-500">Published on March {i + 10}, 2024</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Published</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

