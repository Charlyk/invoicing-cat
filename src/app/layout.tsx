import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import {Provider} from "@/components/ui/provider"
import {StoreProvider} from "@/components/store";
import { getServerTranslation } from '@/lib/localization';
import {CookieConsentManager} from "@/components/cookie-consent";

export async function generateMetadata({
                                           params,
                                       }: {
    params?: { locale?: string };
}): Promise<Metadata> {
    const t = getServerTranslation(params?.locale);

    return {
        title: t.metadata.title,
        description: t.metadata.description,
        icons: {
            icon: [
                { url: "/favicon.ico", sizes: "any" },
                { url: "/favicon-16x16.png", sizes: "16x16" },
                { url: "/favicon-32x32.png", sizes: "32x32" },
            ],
            apple: "/apple-touch-icon.png",
            shortcut: "/favicon.ico",
        },
        manifest: "/site.webmanifest", // Optional if you plan to add PWA support
        openGraph: {
            title: t.metadata.title,
            description: t.metadata.description,
            url: "https://invoicingcat.com",
            siteName: "SoloBridge",
            images: [
                {
                    url: "/android-chrome-512x512.png",
                    width: 512,
                    height: 512,
                    alt: "InvoicingCat logo",
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary",
            title: t.metadata.title,
            description: t.metadata.description,
            images: ["/android-chrome-192x192.png"],
            creator: "@eduardalbu",
        },
    };
}

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <StoreProvider>
            <html suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
            <CookieConsentManager/>
            <Provider>{children}</Provider>
            </body>
            </html>
        </StoreProvider>
    );
}
