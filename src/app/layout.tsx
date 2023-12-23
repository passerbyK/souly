import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import localFont from "next/font/local";

import "./globals.css";
import Header from "./personal/_compoments/Header";

const poetsenOne = localFont({
  src: "./fonts/Poetsen-One.woff2",
  weight: "700",
  style: "normal",
});

export const metadata: Metadata = {
  title: "Souly",
  description:
    "A painting app for the soul. Paint with your heart, create with your soul.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poetsenOne.className}`}>
        <Header />
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
