import { ThemeColorsProvider } from "@/components/theme/theme-context";
import { ThemeProvider } from "@/components/theme/theme-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Stylofy Colors — Visualize Your Palette Live",
  description:
    "Pick colors and see them applied to real UI components instantly. Export to CSS, Tailwind, or JSON.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeColorsProvider>{children}</ThemeColorsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
