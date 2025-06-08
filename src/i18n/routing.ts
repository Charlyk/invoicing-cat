import {defineRouting} from 'next-intl/routing';
import locales from "@/data/locales";

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: locales.map((item) => item.value),

    // Used when no locale matches
    defaultLocale: 'en'
});
