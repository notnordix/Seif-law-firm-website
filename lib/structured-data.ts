export function generateLawFirmSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    name: "Seif Law Firm",
    image: "https://seiflawfirm.com/images/law-office.jpg",
    url: "https://seiflawfirm.com",
    telephone: "+212XXXXXXXXX",
    address: {
      "@type": "PostalAddress",
      addressCountry: "Morocco",
    },
    description: "Professional legal services with a focus on business and commercial law in Morocco.",
    priceRange: "$$",
    openingHours: "Mo,Tu,We,Th,Fr 09:00-18:00 Sa 10:00-14:00",
    founder: {
      "@type": "Person",
      name: "Ayoub Seif El Islam",
      jobTitle: "Founder & Managing Partner",
      description: "PhD researcher with expertise in business law, commercial litigation, and dispute resolution.",
    },
    knowsLanguage: ["French", "English"],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 31.7917,
        longitude: -7.0926,
      },
      geoRadius: "300000",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Legal Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Business Law",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Commercial Litigation",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Property Law",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Intellectual Property",
          },
        },
      ],
    },
  }
}

export function generateBlogPostSchema(post: any) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: `https://seiflawfirm.com${post.coverImage}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: "Ayoub Seif El Islam",
    },
    publisher: {
      "@type": "Organization",
      name: "Seif Law Firm",
      logo: {
        "@type": "ImageObject",
        url: "https://seiflawfirm.com/images/logo.png",
      },
    },
    description: post.excerpt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://seiflawfirm.com/blog/${post.slug}`,
    },
  }
}

