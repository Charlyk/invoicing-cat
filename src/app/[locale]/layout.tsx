import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {getTranslations, setRequestLocale} from "next-intl/server";
import {CookieConsentManager} from "@/components/cookie-consent";
import {Provider} from "@/components/ui/provider";
import {StoreProvider} from "@/components/store";
import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import {Toaster} from "@/components/ui/toaster";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}: { params: Promise<{ locale: string }>}): Promise<Metadata> {
    const {locale} = await params;
    const t = await getTranslations({locale, namespace: 'HomePage'});

    return {
        metadataBase: new URL('https://invoicingcat.com'),
        title: t('metaTitle'),
        description: t('metaDescription'),
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
            title: t('metaTitle'),
            description: t('metaDescription'),
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
            title: t('metaTitle'),
            description: t('metaDescription'),
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

export default async function LocaleLayout({
                                               children,
                                               params
                                           }: {
    children: React.ReactNode;
    params: Promise<{locale: string}>;
}) {
    // Ensure that the incoming `locale` is valid
    const {locale} = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    // Enable static rendering
    setRequestLocale(locale);

    return (
        <StoreProvider>
            <html suppressHydrationWarning lang={locale}>
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
            <CookieConsentManager/>
            <NextIntlClientProvider>
            <Provider>
                {children}
                <Toaster/>
            </Provider>
            </NextIntlClientProvider>
            </body>
            </html>
        </StoreProvider>
    );
}
