import {initFirebaseAnalytics} from "@/lib/firebase";
import {CookieConsentConfig, CookieItem} from "vanilla-cookieconsent";
import en from '../../../messages/en.json';
import fr from '../../../messages/fr.json';
import pt from '../../../messages/pt.json';
import de from '../../../messages/de.json';

const cookies: CookieItem[] = [
    {
        name: /^_ga$/
    },
    {
        name: /^_ga_.*$/
    },
    {
        name: /^_gid$/
    },
    {
        name: /^_gac_.*$/
    },
    {
        name: "cc_cookie"
    }
]

export const cookieConsentConfig: CookieConsentConfig = {
    autoShow: true,
    disablePageInteraction: false,
    guiOptions: {
        consentModal: {
            layout: "cloud",
            position: "bottom center",
            equalWeightButtons: true,
            flipButtons: false,
        },
        preferencesModal: {
            layout: "box",
            position: "right",
            equalWeightButtons: true,
            flipButtons: false,
        },
    },

    categories: {
        necessary: {
            enabled: true,
            readOnly: true,
        },
        analytics: {
            enabled: false,
            autoClear: {
                cookies,
                reloadPage: true
            },
            services: {
                firebase: {
                    label: "Firebase Analytics",
                    cookies,
                    onAccept: () => {
                        // Call your Firebase analytics initializer
                        initFirebaseAnalytics()
                    },
                    onReject: () => {
                        // Optional: handle disable logic if needed
                        // Firebase disables tracking automatically if not initialized
                    }
                }
            },
        }
    },

    language: {
        default: "en",
        translations: {
            en: en.CookieConsent,
            fr: fr.CookieConsent,
            pt: pt.CookieConsent,
            de: de.CookieConsent
        }
    }
}
