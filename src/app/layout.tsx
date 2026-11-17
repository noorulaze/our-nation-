import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/context";
import { CommunityProvider } from "@/lib/community/context";
import { AuthProvider } from "@/lib/auth/context";
import { initialCommunities } from "@/lib/data/initialData";

export const metadata: Metadata = {
  title: "Nammude Naadu | നമ്മുടെ നാട് — Malappuram & Tanur Hyperlocal Platform",
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
    <html lang="ml" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground antialiased flex flex-col">
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
