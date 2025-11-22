import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AuraCV | The Free ATS-Optimized Resume Builder",
  description: "Build a recruiter-grade resume in minutes. No paywalls, no login required. Privacy-first and ATS-friendly.",
  keywords: ["Resume Builder", "Free Resume", "ATS Friendly", "Privacy First", "Open Source Resume"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
