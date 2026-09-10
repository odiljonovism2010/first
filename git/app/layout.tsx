import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import HeaderWrapper from "./components/helpers/HeaderWrapper";
import FooterWrapper from "./components/helpers/FooterWrapper"
import "./globals.css";
import GitBg from "../public/gitbg.jpg";
export const metadata: Metadata = {
  title: "Git odiljonovism2010",
  description: "A GitHub-inspired platform to create, manage and explore repositories.",

  openGraph: {
    title: "Git odiljonovism2010",
    description: "Create repositories, manage issues and explore projects.",
    url: "",
    siteName: "Git odiljonovism2010",
    images: [
      {
        url: GitBg.src,
        width: 1200,
        height: 630,
        alt: "Git odiljonovism2010",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Git odiljonovism2010",
    description: "GitHub-inspired platform.",
    images: [GitBg.src],
  },
};
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <HeaderWrapper />
        {children}
        <FooterWrapper/>
      </body>
    </html>
  );
}