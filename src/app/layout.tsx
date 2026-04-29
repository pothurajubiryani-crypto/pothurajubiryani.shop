import type { Metadata } from "next";
import { DM_Serif_Display, Inter } from "next/font/google";
import "./globals.css";

const display = DM_Serif_Display({ subsets: ["latin"], weight: "400", variable: "--font-display" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Pothuraju Biryani | The Dum God of Biryani | Kondapur, Hyderabad",
  description: "Authentic Hyderabadi Dum Biryani in Kondapur. Slow-cooked over coal, served with love. Order direct & save 10%. WhatsApp: 96400 34646",
  keywords: "biryani kondapur, hyderabad biryani, dum biryani, chicken biryani, pothuraju biryani, best biryani kondapur, food delivery kondapur",
  openGraph: {
    title: "Pothuraju Biryani - The Dum God of Biryani",
    description: "Authentic Hyderabadi Dum Biryani, Pulao & Chinese. Order direct & save 10%!",
    type: "website",
    url: "https://pothurajubiryani.shop",
    siteName: "Pothuraju Biryani",
  },
  robots: "index, follow",
  other: { "google-site-verification": "" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="font-body text-white bg-dark antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
