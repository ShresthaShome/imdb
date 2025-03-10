import type { Metadata } from "next";
import ThemeCom from "@/components/ThemeCom";
import "./globals.css";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import SearchBox from "@/components/SearchBox";

export const metadata: Metadata = {
  title: {
    template: "%s - ImDB",
    default:
      "ImDB: Ratings, Reviews and Where to Watch the Best Movies & TV shows",
  },
  description: "Created by Ullas Shome.",
  applicationName: "ImDB Clone",
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
            <SearchBox />
            {children}
          </ThemeCom>
        </body>
      </html>
    </ClerkProvider>
  );
}
