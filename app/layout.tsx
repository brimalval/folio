import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import DevAgentation from "./components/dev-agentation";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: "variable",
});

export const metadata: Metadata = {
  title: "Brian Valencia — Full-Stack Engineer",
  description:
    "Full-stack engineer building well-crafted digital products. Based in the Philippines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const savedTheme = localStorage.getItem('theme');
                const theme = savedTheme || 'dark';
                document.documentElement.setAttribute('data-theme', theme);
              })();
            `,
          }}
        />
      </head>
      <body className={`${outfit.variable} antialiased`}>
        {children}
        {process.env.NODE_ENV === "development" && <DevAgentation />}
      </body>
    </html>
  );
}
