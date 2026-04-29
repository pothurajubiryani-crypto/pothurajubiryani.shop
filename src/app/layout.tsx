import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import "./globals.css";

const display = DM_Serif_Display({ subsets: ["latin"], weight: "400", variable: "--font-display" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Pothuraju Biryani | The Dum God of Biryani | Kondapur, Hyderabad",
  description: "Authentic Hyderabadi Dum Biryani in Kondapur. Slow-cooked over coal, served with love. Order direct & save 10%. WhatsApp: 96400 34646",
  keywords: "biryani kondapur, hyderabad biryani, dum biryani, chicken biryani, pothuraju biryani, best biryani kondapur, food delivery kondapur",
  metadataBase: new URL("https://pothurajubiryani.shop"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Pothuraju Biryani - The Dum God of Biryani",
    description: "Authentic Hyderabadi Dum Biryani, Pulao & Chinese. Order direct & save 10%!",
    type: "website",
    url: "https://pothurajubiryani.shop",
    siteName: "Pothuraju Biryani",
    images: [{ url: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1200&h=630&fit=crop&q=85", width: 1200, height: 630, alt: "Pothuraju Biryani - Authentic Hyderabadi Dum Biryani" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pothuraju Biryani - The Dum God of Biryani",
    description: "Authentic Hyderabadi Dum Biryani in Kondapur. Order direct & save 10%!",
    images: ["https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1200&h=630&fit=crop&q=85"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: "index, follow",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              name: "Pothuraju Biryani",
              description: "Authentic Hyderabadi Dum Biryani in Kondapur, slow-cooked over coal in sealed handis.",
              url: "https://pothurajubiryani.shop",
              telephone: "+919640034646",
              servesCuisine: ["Indian", "Hyderabadi", "Biryani"],
              priceRange: "₹₹",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Plot 182C/211C, PR Residency, Raghavendra Colony, Circle 20",
                addressLocality: "Kondapur",
                addressRegion: "Telangana",
                postalCode: "500084",
                addressCountry: "IN",
              },
              geo: { "@type": "GeoCoordinates", latitude: 17.4611, longitude: 78.3528 },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                opens: "11:00",
                closes: "00:00",
              },
              aggregateRating: { "@type": "AggregateRating", ratingValue: "4.5", bestRating: "5", ratingCount: "500" },
              image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=1200&h=630&fit=crop&q=85",
            }),
          }}
        />
      </head>
      <body className="font-body text-white bg-dark antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
