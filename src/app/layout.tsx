import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/SimpleAuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NewWebAI - 小黄の数字宇宙工作室",
  description: "NewWebAI是一个基于Next.js框架的智能网站，提供AI驱动的博客、产品和服务",
  authors: [{ name: "小黄の数字宇宙工作室" }],
  keywords: ["AI", "Next.js", "智能网站", "博客", "产品展示"],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "NewWebAI - 小黄の数字宇宙工作室",
    description: "NewWebAI是一个基于Next.js框架的智能网站，提供AI驱动的博客、产品和服务",
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
