import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/i18n/context";
import { CommunityProvider } from "@/lib/community/context";
import { AuthProvider } from "@/lib/auth/context";
import { initialCommunities } from "@/lib/data/initialData";

export const metadata: Metadata = {
  title: "Nammude Naadu | നമ്മുടെ നാട് — Community & Civic Network",
  description: "Everything happening around your community, in one place. Discover events, verify local businesses, report civic issues, and consult Naadu AI.",
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
              defaultCommunity={initialCommunities[1]} // Kakkanad by default
            >
              {children}
            </CommunityProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
