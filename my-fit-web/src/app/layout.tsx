import type { Metadata } from "next";
import { AR_One_Sans, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/context/LocaleContext";

const arOneSans = AR_One_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "600"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "myfitplatform - Plataforma Fitness White-Label",
  description: "Crie sua própria plataforma de fitness em minutos. Treinos, dietas, pagamentos e muito mais.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${arOneSans.variable} ${sourceSerif.variable} ${jetBrainsMono.variable} antialiased`}
      >
        <LocaleProvider>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
