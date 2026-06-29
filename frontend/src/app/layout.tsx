import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "NephroAI — AI-Powered Kidney Stone Detection",
  description:
    "Advanced kidney stone detection using CNN, YOLOv8, and Random Forest AI models. Upload CT scans or enter lab data for instant diagnosis.",
  keywords: ["kidney stone", "AI detection", "CT scan analysis", "NephroAI", "medical AI"],
  openGraph: {
    title: "NephroAI — AI-Powered Kidney Stone Detection",
    description: "See what X-rays can't tell you. AI-powered kidney stone analysis.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
