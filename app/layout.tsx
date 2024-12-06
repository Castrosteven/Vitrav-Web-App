import type { Metadata } from "next";
import "@aws-amplify/ui-react/styles.css";
import "./globals.css";
import ConfigureAmplifyClientSide from "./components/ConfigureAmplify";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Vitrav",
  description: "Plan your perfect trip with curated itineraries.",
};

const inter = Inter({ subsets: ["latin"] });

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          // attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ConfigureAmplifyClientSide>{children}</ConfigureAmplifyClientSide>
        </ThemeProvider>
      </body>
    </html>
  );
}
