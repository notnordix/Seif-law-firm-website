import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BadgeCheck, Building, Calendar, ChevronRight, GraduationCap, Mail, MapPin, Phone } from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { BookAppointmentButton } from "@/components/book-appointment-button"
import { generateLawFirmSchema } from "@/lib/structured-data"
import Script from "next/script"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="relative min-h-screen flex items-center pt-16">
          {/* Background image with overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/law-office.jpg"
              alt="Seif Law Firm office interior with elegant law library and consultation area"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[#1e376b]/80"></div>
          </div>

          <div className="container relative z-10 px-4 md:px-6 h-full flex items-center">
            <div className="w-full lg:w-11/12 text-white">
              <div className="inline-block rounded-lg bg-white/10 px-3 py-1 text-sm text-white mb-4">
                Professional Legal Services
              </div>
              <h1 className="font-script text-4xl md:text-4xl lg:text-5xl tracking-tighter mb-6">
                Expert Legal Solutions for Your Business Needs
              </h1>
              <p className="text-sm md:text-2xl text-gray-200 mb-4 max-w-3xl">
                "The only thing more expensive than hiring a lawyer is not hiring one." - Ayoub Seif El Islam
              </p>
              <p className="text-gray-300 text-xs md:text-xl mb-8 max-w-2xl">
                Seif Law Firm provides comprehensive legal services with a focus on business law, commercial litigation,
                and dispute resolution.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="custom-btn primary-btn text-base sm:text-lg">
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <BookAppointmentButton className="custom-btn secondary-btn text-base sm:text-lg" />
              </div>
            </div>
          </div>

          {/* Animated Chevron Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 h-16 w-16 flex justify-center">
            <div className="chevron"></div>
            <div className="chevron"></div>
            <div className="chevron"></div>
          </div>
        </section>

        <section id="about" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#6cbdfc]/10 px-2 py-1 text-xs sm:text-sm text-[#1e376b]">
                  About Us
                </div>
                <h2 className="font-script text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1e376b]">
                  A Trusted Legal Partner Since 2019
                </h2>
                <p className="max-w-[700px] text-gray-500 text-sm sm:text-base md:text-lg">
                  Founded by Ayoub Seif El Islam, our firm combines academic excellence with practical legal expertise
                  to deliver exceptional results.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6cbdfc]/10 text-[#6cbdfc]">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <h3 className="card-title-script text-[#1e376b]">Academic Excellence</h3>
                <p className="text-gray-500">
                  Our team is led by a PhD researcher with a Master's in Business Law from Université Cadi Ayyad.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6cbdfc]/10 text-[#6cbdfc]">
                  <Building className="h-6 w-6" />
                </div>
                <h3 className="card-title-script text-[#1e376b]">Industry Experience</h3>
                <p className="text-gray-500">
                  With over 5 years of experience, we've successfully handled complex legal matters for diverse clients.
                </p>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6cbdfc]/10 text-[#6cbdfc]">
                  <BadgeCheck className="h-6 w-6" />
                </div>
                <h3 className="card-title-script text-[#1e376b]">Client-Focused Approach</h3>
                <p className="text-gray-500">
                  We prioritize preventive legal counsel to help clients avoid costly legal pitfalls.
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <Button className="custom-btn primary-btn-alt text-sm sm:text-base">
                <Link href="/about">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="practice-areas" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#8c1c40]/10 px-2 py-1 text-xs sm:text-sm text-[#8c1c40]">
                  Practice Areas
                </div>
                <h2 className="font-script text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1e376b]">
                  Comprehensive Legal Services
                </h2>
                <p className="max-w-[700px] text-gray-500 text-sm sm:text-base md:text-lg">
                  Our expertise spans multiple areas of business and commercial law to address your diverse legal needs.
                </p>
              </div>
            </div>
            <Tabs defaultValue="business" className="mt-8 sm:mt-12 w-full max-w-4xl mx-auto">
              <TabsList className="grid w-full grid-cols-3 mb-6 sm:mb-8 h-auto">
                <TabsTrigger value="business" className="text-[8px] sm:text-sm py-1.5 px-2 sm:py-2 sm:px-3">
                  Business & Corporate
                </TabsTrigger>
                <TabsTrigger value="property" className="text-[7px] sm:text-sm py-1.5 px-2 sm:py-2 sm:px-3">
                  Property & Estate
                </TabsTrigger>
                <TabsTrigger value="intellectual" className="text-[7px] sm:text-sm py-1.5 px-2 sm:py-2 sm:px-3">
                  Intellectual Property
                </TabsTrigger>
              </TabsList>
              <TabsContent value="business" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div className="practice-card group relative rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
                    <div className="card-border absolute inset-0 rounded-lg"></div>
                    <Card className="h-full bg-transparent border-none">
                      <CardContent className="p-6 space-y-2">
                        <h3 className="card-title-script text-[#1e376b]">Legal Consulting</h3>
                        <p className="text-sm text-gray-500">
                          Expert legal advice and consulting services for businesses of all sizes.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="practice-card group relative rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
                    <div className="card-border absolute inset-0 rounded-lg"></div>
                    <Card className="h-full bg-transparent border-none">
                      <CardContent className="p-6 space-y-2">
                        <h3 className="card-title-script text-[#1e376b]">Corporate Law</h3>
                        <p className="text-sm text-gray-500">
                          Comprehensive corporate legal services including formation, governance, and compliance.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="practice-card group relative rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
                    <div className="card-border absolute inset-0 rounded-lg"></div>
                    <Card className="h-full bg-transparent border-none">
                      <CardContent className="p-6 space-y-2">
                        <h3 className="card-title-script text-[#1e376b]">Labor & Employment Law</h3>
                        <p className="text-sm text-gray-500">
                          Guidance on employment contracts, workplace policies, and dispute resolution.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="practice-card group relative rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
                    <div className="card-border absolute inset-0 rounded-lg"></div>
                    <Card className="h-full bg-transparent border-none">
                      <CardContent className="p-6 space-y-2">
                        <h3 className="card-title-script text-[#1e376b]">Consumer Law</h3>
                        <p className="text-sm text-gray-500">
                          Protection of consumer rights and representation in consumer-related disputes.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="property" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div className="practice-card group relative rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
                    <div className="card-border absolute inset-0 rounded-lg"></div>
                    <Card className="h-full bg-transparent border-none">
                      <CardContent className="p-6 space-y-2">
                        <h3 className="card-title-script text-[#1e376b]">Property Law</h3>
                        <p className="text-sm text-gray-500">
                          Legal services for real estate transactions, property disputes, and land use matters.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="practice-card group relative rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
                    <div className="card-border absolute inset-0 rounded-lg"></div>
                    <Card className="h-full bg-transparent border-none">
                      <CardContent className="p-6 space-y-2">
                        <h3 className="card-title-script text-[#1e376b]">Wills Planning Law</h3>
                        <p className="text-sm text-gray-500">
                          Assistance with drafting wills, estate planning, and succession planning.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="practice-card group relative rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
                    <div className="card-border absolute inset-0 rounded-lg"></div>
                    <Card className="h-full bg-transparent border-none">
                      <CardContent className="p-6 space-y-2">
                        <h3 className="card-title-script text-[#1e376b]">Trust & Estate Litigation</h3>
                        <p className="text-sm text-gray-500">
                          Representation in disputes involving trusts, estates, and inheritance matters.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="intellectual" className="space-y-4">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <div className="practice-card group relative rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
                    <div className="card-border absolute inset-0 rounded-lg"></div>
                    <Card className="h-full bg-transparent border-none">
                      <CardContent className="p-6 space-y-2">
                        <h3 className="card-title-script text-[#1e376b]">Patent Law</h3>
                        <p className="text-sm text-gray-500">
                          Assistance with patent applications, protection, and infringement disputes.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="practice-card group relative rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
                    <div className="card-border absolute inset-0 rounded-lg"></div>
                    <Card className="h-full bg-transparent border-none">
                      <CardContent className="p-6 space-y-2">
                        <h3 className="card-title-script text-[#1e376b]">Copyright Law</h3>
                        <p className="text-sm text-gray-500">
                          Protection of creative works and representation in copyright infringement cases.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="practice-card group relative rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
                    <div className="card-border absolute inset-0 rounded-lg"></div>
                    <Card className="h-full bg-transparent border-none">
                      <CardContent className="p-6 space-y-2">
                        <h3 className="card-title-script text-[#1e376b]">Trademark Law</h3>
                        <p className="text-sm text-gray-500">
                          Trademark registration, protection, and enforcement of trademark rights.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        <section id="team" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#6cbdfc]/10 px-2 py-1 text-xs sm:text-sm text-[#6cbdfc]">
                  Our Team
                </div>
                <h2 className="font-script text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1e376b]">
                  Meet Our Legal Experts
                </h2>
                <p className="max-w-[700px] text-gray-500 text-sm sm:text-base md:text-lg">
                  Our team combines academic excellence with practical experience to deliver exceptional legal services.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative h-40 w-40 overflow-hidden rounded-full">
                  <Image
                    src="/images/ayoub-seif.png"
                    alt="Ayoub Seif El Islam"
                    width={160}
                    height={160}
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="font-script text-xl text-[#1e376b]">Ayoub Seif El Islam</h3>
                  <p className="text-sm text-[#8c1c40]">Founder & Managing Partner</p>
                  <p className="text-sm text-gray-500">
                    PhD Researcher with expertise in business law, commercial litigation, and dispute resolution.
                  </p>
                  <div className="flex justify-center space-x-4">
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
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="relative h-40 w-40 overflow-hidden rounded-full">
                  <Image
                    src="/images/attorney1.jpg"
                    alt="Legal Associate"
                    width={160}
                    height={160}
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="font-script text-xl text-[#1e376b]">Legal Associate</h3>
                  <p className="text-sm text-[#8c1c40]">Senior Attorney</p>
                  <p className="text-sm text-gray-500">Specializing in dispute resolution and commercial litigation.</p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4">
                <div className="relative h-40 w-40 overflow-hidden rounded-full">
                  <Image
                    src="/images/attorney2.jpg"
                    alt="Legal Associate"
                    width={160}
                    height={160}
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="font-script text-xl text-[#1e376b]">Legal Associate</h3>
                  <p className="text-sm text-[#8c1c40]">Business Law Specialist</p>
                  <p className="text-sm text-gray-500">Expert in corporate formation and regulatory compliance.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="blog" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#6cbdfc]/10 px-2 py-1 text-xs sm:text-sm text-[#6cbdfc]">
                  Our Blog
                </div>
                <h2 className="font-script text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1e376b]">
                  Legal Insights & Updates
                </h2>
                <p className="max-w-[700px] text-gray-500 text-sm sm:text-base md:text-lg">
                  Stay informed with our latest articles on legal topics, case studies, and industry trends.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Link href="/blog/preventive-legal-counsel" className="block">
                <div className="blog-card group relative rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div className="card-border absolute inset-0 rounded-lg"></div>
                  <Card className="h-full bg-transparent border-none">
                    <div className="relative h-48 w-full">
                      <Image
                        src="/images/blog-post1.jpg"
                        alt="Preventive legal counsel concept with business professionals reviewing documents"
                        width={400}
                        height={200}
                        className="object-cover w-full h-full"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <Calendar className="h-4 w-4" />
                        <span>March 15, 2024</span>
                      </div>
                      <h3 className="card-title-script text-[#1e376b] mb-2">
                        The Importance of Preventive Legal Counsel
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Discover why proactive legal risk management is essential for businesses of all sizes.
                      </p>
                      <div className="flex items-center text-[#8c1c40] group-hover:text-[#6cbdfc] text-sm font-medium">
                        Read More <ChevronRight className="h-4 w-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Link>
              <Link href="/blog/business-contracts" className="block">
                <div className="blog-card group relative rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div className="card-border absolute inset-0 rounded-lg"></div>
                  <Card className="h-full bg-transparent border-none">
                    <div className="relative h-48 w-full">
                      <Image
                        src="/images/blog-post2.jpg"
                        alt="Business contract review and negotiation among legal team members"
                        width={400}
                        height={200}
                        className="object-cover w-full h-full"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <Calendar className="h-4 w-4" />
                        <span>February 28, 2024</span>
                      </div>
                      <h3 className="card-title-script text-[#1e376b] mb-2">
                        Key Considerations for Business Contracts
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Learn about the essential elements that should be included in every business contract.
                      </p>
                      <div className="flex items-center text-[#8c1c40] group-hover:text-[#6cbdfc] text-sm font-medium">
                        Read More <ChevronRight className="h-4 w-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Link>
              <Link href="/blog/commercial-disputes-morocco" className="block">
                <div className="blog-card group relative rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div className="card-border absolute inset-0 rounded-lg"></div>
                  <Card className="h-full bg-transparent border-none">
                    <div className="relative h-48 w-full">
                      <Image
                        src="/images/blog-post3.jpg"
                        alt="Moroccan courthouse representing commercial dispute resolution"
                        width={400}
                        height={200}
                        className="object-cover w-full h-full"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <Calendar className="h-4 w-4" />
                        <span>January 10, 2024</span>
                      </div>
                      <h3 className="card-title-script text-[#1e376b] mb-2">
                        Navigating Commercial Disputes in Morocco
                      </h3>
                      <p className="text-sm text-gray-500 mb-4">
                        An overview of the commercial dispute resolution process in the Moroccan legal system.
                      </p>
                      <div className="flex items-center text-[#8c1c40] group-hover:text-[#6cbdfc] text-sm font-medium">
                        Read More <ChevronRight className="h-4 w-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </Link>
            </div>
            <div className="flex justify-center mt-8">
              <Button className="custom-btn primary-btn-alt text-sm sm:text-base">
                <Link href="/blog">View All Articles</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="contact-section" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-3 sm:space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#6cbdfc]/10 px-2 py-1 text-xs sm:text-sm text-[#6cbdfc]">
                  Contact Us
                </div>
                <h2 className="font-script text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#1e376b]">
                  Get in Touch with Our Team
                </h2>
                <p className="max-w-[700px] text-gray-500 text-sm sm:text-base md:text-lg">
                  Schedule a consultation to discuss your legal needs with our experienced attorneys.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 py-6 sm:py-8">
              <div className="contact-card group relative rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md">
                <div className="card-border absolute inset-0 rounded-lg"></div>
                <Card className="h-full bg-transparent border-none">
                  <CardContent className="p-3 sm:p-4 flex flex-col items-center text-center space-y-2">
                    <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#6cbdfc]/10 text-[#6cbdfc] group-hover:bg-[#6cbdfc]/20 transition-all duration-300">
                      <Phone className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <h3 className="text-[#1e376b] text-base sm:text-lg font-medium">Call Us</h3>
                    <p className="text-gray-500 text-xs sm:text-sm">+212 XXXXXXXXX</p>
                  </CardContent>
                </Card>
              </div>

              <div className="contact-card group relative rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md">
                <div className="card-border absolute inset-0 rounded-lg"></div>
                <Card className="h-full bg-transparent border-none">
                  <CardContent className="p-3 sm:p-4 flex flex-col items-center text-center space-y-2">
                    <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#6cbdfc]/10 text-[#6cbdfc] group-hover:bg-[#6cbdfc]/20 transition-all duration-300">
                      <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <h3 className="text-[#1e376b] text-base sm:text-lg font-medium">Email Us</h3>
                    <p className="text-gray-500 text-xs sm:text-sm">contact@seiflawfirm.com</p>
                  </CardContent>
                </Card>
              </div>

              <div className="contact-card group relative rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md">
                <div className="card-border absolute inset-0 rounded-lg"></div>
                <Card className="h-full bg-transparent border-none">
                  <CardContent className="p-3 sm:p-4 flex flex-col items-center text-center space-y-2">
                    <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-[#6cbdfc]/10 text-[#6cbdfc] group-hover:bg-[#6cbdfc]/20 transition-all duration-300">
                      <MapPin className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <h3 className="text-[#1e376b] text-base sm:text-lg font-medium">Visit Us</h3>
                    <p className="text-gray-500 text-xs sm:text-sm">Morocco</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex justify-center mt-6">
              <BookAppointmentButton className="custom-btn primary-btn text-sm sm:text-base" />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <Script
        id="law-firm-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateLawFirmSchema()) }}
      />
    </div>
  )
}

