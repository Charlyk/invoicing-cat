'use client'

import { useRouter, usePathname } from "next/navigation";
import translations from "./translations";

export type SupportedLocale = "en";

export type Translation = typeof translations['en']

export function useTranslation() {
    const router = useRouter()
    const pathname = usePathname()
    const locale = extractLocaleFromPath(pathname) as SupportedLocale ?? 'en'
    const t = translations[locale] ?? translations['en']

    const setLocale = (newLocale: SupportedLocale) => {
        const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
        router.push(newPath)
    }

    return { t, locale, setLocale }
}

function extractLocaleFromPath(pathname: string): string {
    const match = pathname.match(/^\/(en|ro|ru)(\/|$)/)
    return match?.[1] ?? 'en'
}
