import {use} from 'react';
import {Stack} from "@chakra-ui/react";
import {NavBar} from "@/components/nav-bar";
import {Footer} from "@/components/footer";
import {getTranslations, setRequestLocale} from "next-intl/server";
import {routing} from "@/i18n/routing";
import type {Metadata} from "next";
import {AboutHero} from "@/components/about/hero";
import {WhyPeopleLove} from "@/components/about/why-people-love";
import {TechnicalPerks} from "@/components/about/technical-perks";
import {SupportedCountries} from "@/components/about/supported-countries";
import {ContactUs} from "@/components/about/contact-us";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'AboutPage' });

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
        manifest: "/site.webmanifest",
        openGraph: {
            title: t('metaTitle'),
            description: t('metaDescription'),
            url: "https://invoicingcat.com",
            siteName: "InvoicingCat",
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

export default function About({params}: { params: Promise<{ locale: string }> }) {
    const {locale} = use(params);
    setRequestLocale(locale);

    return (
        <Stack colorPalette="orange">
            <NavBar downloadable={false}/>
            <Stack gap={16} align={{ sm: 'center' }} width="full" textAlign="start" pt={16}>
                <AboutHero/>
                <WhyPeopleLove/>
                <TechnicalPerks/>
                <SupportedCountries/>
                <ContactUs/>
            </Stack>
            <Footer/>
        </Stack>
    );
}
