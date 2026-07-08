import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@teispace/next-themes";
import { getTheme, getThemeScript } from "@teispace/next-themes/server";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "500"],
});

const themeConfig = {
  attribute: "class",
  defaultTheme: "dark",
  enableSystem: true,
  disableTransitionOnChange: true,
} as const;

export const metadata: Metadata = {
  title: "Anas Abdelhakim | Full-Stack Software Engineer",
  description:
    "Full-Stack & Backend Engineer specializing in high-performance architectures, Clean Architecture patterns, and seamless system integrations.",
  keywords: ["Full-Stack Engineer", "Backend Engineer", "Next.js", "NestJS", "TypeScript", "React"],
  authors: [{ name: "Anas Abdelhakim" }],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Anas Abdelhakim | Full-Stack Software Engineer",
    description: "Full-Stack & Backend Engineer — high-performance architectures, Clean Architecture, system integrations.",
    type: "website",
    locale: "en_US",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialTheme = await getTheme();
  const themeScript  = getThemeScript({ ...themeConfig, initialTheme });

  return (
    <html lang="en" suppressHydrationWarning>
      <head>

        <script dangerouslySetInnerHTML={{ __html: themeScript }} />

        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <ThemeProvider {...themeConfig} initialTheme={initialTheme ?? undefined}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}