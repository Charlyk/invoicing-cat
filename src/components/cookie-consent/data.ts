import {initFirebaseAnalytics} from "@/lib/firebase";

export const cookieConsentConfig = {
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
            autoClear: true,
            services: [
                {
                    id: "firebase-analytics",
                    label: "Firebase Analytics",
                    cookies: ["_ga", "_gid", "_gac_*"],
                    onAccept: () => {
                        // Call your Firebase analytics initializer
                        initFirebaseAnalytics()
                    },
                    onReject: () => {
                        // Optional: handle disable logic if needed
                        // Firebase disables tracking automatically if not initialized
                    }
                }
            ]
        }
    },

    language: {
        default: "en",
        translations: {
            en: {
                consentModal: {
                    title: "We use cookies",
                    description: "We use cookies to improve your experience with Firebase Analytics.",
                    acceptAllBtn: "Accept all",
                    acceptNecessaryBtn: "Reject all",
                    showPreferencesBtn: "Manage preferences"
                },
                preferencesModal: {
                    title: "Manage cookie preferences",
                    acceptAllBtn: "Accept all",
                    acceptNecessaryBtn: "Reject all",
                    savePreferencesBtn: "Accept selected",
                    closeIconLabel: "Close modal",
                    sections: [
                        {
                            title: "Cookies?",
                            description: "Yep, just the useful kind 🍪"
                        },
                        {
                            title: "Necessary Cookies",
                            description: "Required for the site to function properly.",
                            linkedCategory: "necessary"
                        },
                        {
                            title: "Analytics",
                            description: "Used to track anonymous usage data via Firebase Analytics.",
                            linkedCategory: "analytics"
                        },
                    ]
                }
            }
        }
    }
}
