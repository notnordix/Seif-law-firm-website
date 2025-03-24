import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { BadgeCheck, Building, GraduationCap, Users } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
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
                <div className="inline-block rounded-lg bg-white/10 px-3 py-1 text-sm text-white">About Us</div>
                <h1 className="font-script text-3xl sm:text-4xl md:text-5xl text-white">About Seif Law Firm</h1>
                <p className="max-w-[700px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  A trusted legal partner committed to excellence and client success since 2019.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-[#6cbdfc]/10 px-3 py-1 text-sm text-[#6cbdfc]">
                  Our Story
                </div>
                <h2 className="font-script text-3xl sm:text-4xl text-[#1e376b]">A Legacy of Legal Excellence</h2>
                <p className="text-gray-500 md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                  Founded in December 2022 by Ayoub Seif El Islam, Seif Law Firm has quickly established itself as a
                  trusted legal partner for businesses and individuals across Morocco. With a foundation built on
                  academic excellence and practical experience, our firm delivers exceptional legal services tailored to
                  each client's unique needs.
                </p>
                <p className="text-gray-500 md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                  Prior to establishing Seif Law Firm, Ayoub gained valuable experience at Nakhli Law Firm from 2019 to
                  2022, where he honed his skills in business law, commercial litigation, and dispute resolution.
                </p>
                <p className="text-gray-500 md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                  Our philosophy is encapsulated in our founder's often-cited statement: "The only thing more expensive
                  than hiring a lawyer is not hiring one." This reflects our commitment to preventive legal counsel and
                  proactive risk management.
                </p>
                <Button className="bg-[#1e376b] text-white hover:bg-[#8c1c40] transition-colors duration-300 font-medium rounded-md px-5 py-2.5">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
              <div className="mx-auto w-full max-w-[500px] aspect-square overflow-hidden rounded-xl">
                <Image
                  src="/images/law-office.jpg"
                  alt="Seif Law Firm Office"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#8c1c40]/10 px-3 py-1 text-sm text-[#8c1c40]">
                  Our Values
                </div>
                <h2 className="font-script text-3xl sm:text-4xl md:text-5xl text-[#1e376b]">What Sets Us Apart</h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our core values guide everything we do and define our approach to legal services.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardContent className="p-6 space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6cbdfc]/10 text-[#6cbdfc]">
                    <BadgeCheck className="h-6 w-6" />
                  </div>
                  <h3 className="card-title-script text-[#1e376b]">Excellence</h3>
                  <p className="text-sm text-gray-500">
                    We strive for excellence in every aspect of our work, from legal research to client representation.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6cbdfc]/10 text-[#6cbdfc]">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="card-title-script text-[#1e376b]">Client-Focused</h3>
                  <p className="text-sm text-gray-500">
                    We prioritize understanding our clients' unique needs to deliver tailored legal solutions.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6cbdfc]/10 text-[#6cbdfc]">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <h3 className="card-title-script text-[#1e376b]">Knowledge</h3>
                  <p className="text-sm text-gray-500">
                    We combine academic expertise with practical experience to provide comprehensive legal guidance.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6cbdfc]/10 text-[#6cbdfc]">
                    <Building className="h-6 w-6" />
                  </div>
                  <h3 className="card-title-script text-[#1e376b]">Integrity</h3>
                  <p className="text-sm text-gray-500">
                    We uphold the highest ethical standards in all our professional relationships and legal work.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="mx-auto w-full max-w-[500px] aspect-square overflow-hidden rounded-xl">
                <Image
                  src="/images/ayoub-seif.png"
                  alt="Ayoub Seif El Islam"
                  width={500}
                  height={500}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-[#6cbdfc]/10 px-3 py-1 text-sm text-[#6cbdfc]">
                  Our Founder
                </div>
                <h2 className="font-script text-3xl sm:text-4xl text-[#1e376b]">Ayoub Seif El Islam</h2>
                <p className="text-gray-500 md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                  Ayoub Seif El Islam is a practicing lawyer (avocat) and legal consultant in Morocco. He is also a PhD
                  researcher, demonstrating his commitment to academic excellence and continuous learning in the legal
                  field.
                </p>
                <p className="text-gray-500 md:text-lg/relaxed lg:text-base/relaxed xl:text-lg/relaxed">
                  With a Master's degree in Business Law from Université Cadi Ayyad, specializing in banking, business,
                  finance, and securities law, Ayoub brings a wealth of knowledge to his practice.
                </p>
                <div className="space-y-2">
                  <h3 className="card-title-script text-[#1e376b]">Expertise</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <BadgeCheck className="h-5 w-5 text-[#6cbdfc] mt-0.5" />
                      <span className="text-gray-500">Research Skills</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <BadgeCheck className="h-5 w-5 text-[#6cbdfc] mt-0.5" />
                      <span className="text-gray-500">Commercial Litigation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <BadgeCheck className="h-5 w-5 text-[#6cbdfc] mt-0.5" />
                      <span className="text-gray-500">Dispute Resolution</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="card-title-script text-[#1e376b]">Languages</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <BadgeCheck className="h-5 w-5 text-[#6cbdfc] mt-0.5" />
                      <span className="text-gray-500">French (Native or Bilingual)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <BadgeCheck className="h-5 w-5 text-[#6cbdfc] mt-0.5" />
                      <span className="text-gray-500">English (Full Professional)</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h3 className="card-title-script text-[#1e376b]">Honors & Awards</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <BadgeCheck className="h-5 w-5 text-[#6cbdfc] mt-0.5" />
                      <span className="text-gray-500">Great Debater</span>
                    </li>
                  </ul>
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

