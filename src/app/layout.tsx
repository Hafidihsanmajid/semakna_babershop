import type { Metadata } from "next";
import { Inter, Oswald, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Semakna Barbershop | Classic Vintage & Dark Luxury Grooming",
  description:
    "Semakna Barbershop - Classic Vintage & Dark Luxury Grooming. Menampilkan identitas visual maskulin dan hangat, layanan potong rambut, cukur jenggot, dan perawatan pria premium.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${oswald.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#121315] text-white font-body selection:bg-[#D49A58] selection:text-[#121315]">
        {children}
      </body>
    </html>
  );
}
