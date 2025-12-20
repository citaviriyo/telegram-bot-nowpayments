import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";



const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Koinity",
  description: "Koinity Telegram Bot + NowPayments integration",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Koinity",
    description: "Koinity Telegram Bot + NowPayments integration",
    siteName: "Koinity",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Koinity",
    description: "Koinity Telegram Bot + NowPayments integration",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={inter.className}
      >
        {children}
        
      </body>
    </html>
  );
}
