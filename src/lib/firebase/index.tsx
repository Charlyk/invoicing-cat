'use client'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {Analytics, getAnalytics} from "firebase/analytics";
import {useEffect, useState} from "react";

let analyticsInstance: Analytics | null = null

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const initFirebaseAnalytics = (): Analytics | null => {
    if (typeof window === 'undefined') return null
    if (analyticsInstance) return analyticsInstance

    const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    }

    const app = initializeApp(firebaseConfig)
    analyticsInstance = getAnalytics(app)

    return analyticsInstance
}

const useFirebaseAnalytics = (): Analytics | null => {
    const [analytics, setAnalytics] = useState<Analytics | null>(null);

    useEffect(() => {
        const app = initializeApp(firebaseConfig);
        const analytics = getAnalytics(app);
        setAnalytics(analytics)
    }, []);

    return analytics
}

export default useFirebaseAnalytics;
