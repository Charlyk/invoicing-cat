import translations from "@/lib/localization/translations";
import {Translation} from "@/lib/localization/useTranslation";


export function getServerTranslation(locale?: string): Translation {
    return translations[locale as keyof typeof translations] || translations.en;
}
