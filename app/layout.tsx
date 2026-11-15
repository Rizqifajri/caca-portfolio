import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { NavigationBar } from "@/components/navigation-bar";
import { Footer } from "@/components/footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ivyPresto = localFont({
  src: "../public/font/IvyPresto Display SemiBold Italic.ttf",
  variable: "--font-ivypresto",
  weight: "400",
  style: "italic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Calu Portfolio",
  description: "Welcome to my portfolio! I'm a passionate video editor and animator dedicated to bringing stories to life through captivating visuals. Explore my projects, gallery, and get in touch to collaborate on your next creative endeavor.",
  icons: {
    icon: "/icons/sun-flower.svg",
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
      className={`${poppins.variable} ${ivyPresto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <NavigationBar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
