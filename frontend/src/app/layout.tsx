import type { Metadata } from "next";
import { Montserrat, Open_Sans, Roboto_Mono } from "next/font/google";
import { Layout } from "@/components/layout/Layout";
import { AuthProvider } from "@/context/AuthContext";
import { AlertProvider } from "@/context/AlertContext";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-opensans",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "EmpreTech",
  description: "Plataforma para emprendedores tecnológicos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${montserrat.variable} ${openSans.variable} ${robotoMono.variable}`} suppressHydrationWarning>
      <body className="font-opensans bg-background min-h-screen">
        <AuthProvider>
          <AlertProvider>
            <Layout>{children}</Layout>
          </AlertProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
