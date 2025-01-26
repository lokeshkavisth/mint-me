import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { GithubIcon } from "lucide-react";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GitHub README Generator",
  description:
    "Create stunning GitHub profile READMEs using AI and your GitHub data.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <header className="px-4 lg:px-6 h-14 flex items-center border-b sticky top-0 z-1  backdrop-blur-sm">
              <Link className="flex items-center justify-center gap-2" href="/">
                <Image src={"/logo.svg"} alt="Logo" width={25} height={25} />
                <span className="font-bold">MINT/me</span>
              </Link>
              <nav className="ml-auto flex items-center gap-4 sm:gap-6">
                <Link
                  className="text-sm font-medium hover:underline underline-offset-4"
                  href="#"
                >
                  Features
                </Link>
                <Link
                  className="text-sm font-medium hover:underline underline-offset-4"
                  href="#"
                >
                  Docs
                </Link>
                <Link
                  className="text-sm font-medium hover:underline underline-offset-4"
                  href="#"
                >
                  GitHub
                </Link>
                <ModeToggle />
              </nav>
            </header>
            <main className="min-h-screen mx-auto">{children}</main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                © 2024 README Gen. All rights reserved.
              </p>
              <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                <Link
                  className="text-xs hover:underline underline-offset-4"
                  href="#"
                >
                  Terms of Service
                </Link>
                <Link
                  className="text-xs hover:underline underline-offset-4"
                  href="#"
                >
                  Privacy
                </Link>
              </nav>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
