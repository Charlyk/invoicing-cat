'use client'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {Analytics, getAnalytics} from "firebase/analytics";
import {useEffect, useState} from "react";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAi-GDw50v-_IqjH4xmok8CaJ4Q0HLw3hM",
    authDomain: "invoicingcat.firebaseapp.com",
    projectId: "invoicingcat",
    storageBucket: "invoicingcat.firebasestorage.app",
    messagingSenderId: "692002127388",
    appId: "1:692002127388:web:612a9990688ecf6d12e9d9",
    measurementId: "G-Y89W1D4B0Z"
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
