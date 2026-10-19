import type { Metadata } from "next";
import { Poppins, Great_Vibes } from "next/font/google";
import "./globals.css";
import { NavigationBar } from "@/components/navigation-bar";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Calu Portfolio",
  description: "Welcome to my portfolio! I'm a passionate video editor and animator dedicated to bringing stories to life through captivating visuals. Explore my projects, gallery, and get in touch to collaborate on your next creative endeavor.",
  icons: {
    icon: "/icons/sun-flower.svg",
  },
};

import { SmoothScroll } from "@/components/smooth-scroll";
import { Footer } from "@/components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${greatVibes.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <NavigationBar />
        <SmoothScroll>
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
