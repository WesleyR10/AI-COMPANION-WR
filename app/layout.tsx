import "./globals.css";

import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { ProModal } from "@/components/pro-modal";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: "companion.ai",
  description: `About AI-Companion is a cool software that lets you create your own custom AI models of people you admire, like actors or celebrities. It's a tool to make personalized artificial intelligence companions based on your favorite individuals`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <ProModal />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
