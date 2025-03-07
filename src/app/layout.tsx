import type { Metadata } from "next";
import ThemeCom from "@/components/ThemeCom";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeCom>
            <Header />
            <Navbar />
            {children}
          </ThemeCom>
        </body>
      </html>
    </ClerkProvider>
  );
}
