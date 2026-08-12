import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clovo | Salgsdashboard bygget for teamet deres",
  description:
    "Vi bygger et salgsdashboard rundt teamet deres, og dere kan tilpasse det videre når arbeidsflyten endrer seg.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nb">
      <body>{children}</body>
    </html>
  );
}
