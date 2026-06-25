import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@teispace/next-themes";
import { getTheme, getThemeScript } from "@teispace/next-themes/server";
import "./globals.css";

// تحسين: تعريف الخطوط خارج الـ Layout يقلل من إعادة تنفيذ الكود
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const themeConfig = {
  attribute: "class",
  defaultTheme: "dark",
  enableSystem: true,
  disableTransitionOnChange: false,
};

export const metadata: Metadata = {
  title: "Anas Abdelhakim | Software Engineer",
  description: "Full-Stack Developer focused on high-performance architectures.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialTheme = await getTheme();
  const themeScript = getThemeScript({ ...themeConfig, initialTheme });

  return (
    // suppressHydrationWarning ضرورية جداً بسبب تغيير الـ class الخاص بالثيم في الـ html tag
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground`}>
        {/* نضع الـ Provider في أعلى مستوى لتوفير السياق */}
        <ThemeProvider {...themeConfig} initialTheme={initialTheme ?? undefined}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}