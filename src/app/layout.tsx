import type { Metadata, Viewport } from "next";
import { Manrope, Anek_Malayalam } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/context";
import { CommunityProvider } from "@/lib/community/context";
import { AuthProvider } from "@/lib/auth/context";
import { initialCommunities } from "@/lib/data/initialData";

// Configure Manrope for English UI
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
  preload: true,
});

// Configure Anek Malayalam for Malayalam UI
const anekMalayalam = Anek_Malayalam({
  subsets: ["malayalam", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-anek-malayalam",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "OUR NATION | നമ്മുടെ നാട് — Malappuram & Tanur Civic Digital Platform",
  description: "മലപ്പുറം ജില്ലയുടെയും താനൂർ നഗരസഭയുടെയും സമഗ്ര ഡിജിറ്റൽ കമ്മ്യൂണിറ്റി പ്ലാറ്റ്‌ഫോം. Hyperlocal civic portal for Malappuram District and Tanur Municipality, Kerala.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="ml" 
      className={`${manrope.variable} ${anekMalayalam.variable} font-sans`} 
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background text-foreground antialiased flex flex-col font-sans selection:bg-[#1B4D36] selection:text-white">
        <LanguageProvider>
          <AuthProvider>
            <CommunityProvider
              initialCommunities={initialCommunities}
              defaultCommunity={initialCommunities.find(c => c.slug === "tanur") || initialCommunities[0]}
            >
              {children}
            </CommunityProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
