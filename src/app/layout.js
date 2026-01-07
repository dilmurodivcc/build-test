"use client";

import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    }
  }
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={poppins.variable}
    >
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={poppins.className}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <LanguageProvider>
              <Header />
              <main>{children}</main>
              <Footer />
            </LanguageProvider>
          </ThemeProvider>
        </QueryClientProvider>
        <Script
          id="replain-settings"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `window.replainSettings = { id: '06fc0fcd-781f-4c4d-9f72-e68da0fe7cfb' };`,
          }}
        />
        <Script
          id="replain-widget"
          strategy="afterInteractive"
          src="https://widget.replain.cc/dist/client.js"
        />
      </body>
    </html>
  );
}
