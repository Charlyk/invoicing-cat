'use client'
import { useEffect } from "react";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as CookieConsent from "vanilla-cookieconsent";
import {cookieConsentConfig} from "@/components/cookie-consent/data";

export const CookieConsentManager = () => {
    useEffect(() => {
        CookieConsent.run(cookieConsentConfig);
    }, []);
    return null
}
