'use client'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {Analytics, getAnalytics} from "firebase/analytics";
import {useEffect, useState} from "react";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY!,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.FIREBASE_PROJECT_ID!,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.FIREBASE_APP_ID!,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID!,
};

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
