import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Selvhostet (ingen ekstern nettverksforespørsel), variabel font eksponert
// som --font-sans slik landingssiden forventer.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Custom salgsdashboard | Bygget for teamet deres",
  description:
    "Vi bygger et salgsdashboard rundt teamet deres, og dere kan tilpasse det videre når arbeidsflyten endrer seg.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#05070d",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nb" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
