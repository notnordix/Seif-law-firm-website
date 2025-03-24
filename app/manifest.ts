import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Seif Law Firm",
    short_name: "Seif Law",
    description: "Professional legal services with a focus on business and commercial law in Morocco.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1e376b",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}

