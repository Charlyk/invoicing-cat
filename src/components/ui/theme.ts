import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

export const colors = {
    gray: {
        0:   { value: '#ffffff' },
        50:  { value: '#f9fafb' },
        100: { value: '#f3f4f6' },
        200: { value: '#e5e7eb' },
        300: { value: '#d1d5db' },
        400: { value: '#9ca3af' },
        500: { value: '#6b7280' },
        600: { value: '#4b5563' },
        700: { value: '#374151' },
        800: { value: '#1f2937' },
        900: { value: '#111827' },
    },
    orange: {
        50:  { value: '#fff7ed' },
        100: { value: '#ffedd5' },
        200: { value: '#fed7aa' },
        300: { value: '#fdba74' },
        400: { value: '#fb923c' },
        500: { value: '#f97316' }, // used for buttons
        600: { value: '#ea580c' },
        700: { value: '#c2410c' },
        800: { value: '#9a3412' },
        900: { value: '#7c2d12' },
    },
    blue: {
        50:  { value: '#eff6ff' },
        100: { value: '#dbeafe' },
        200: { value: '#bfdbfe' },
        300: { value: '#93c5fd' },
        400: { value: '#60a5fa' },
        500: { value: '#3b82f6' }, // used for links and accents
        600: { value: '#2563eb' },
        700: { value: '#1d4ed8' },
        800: { value: '#1e40af' },
        900: { value: '#1e3a8a' },
    },
    yellow: {
        50:  { value: '#fefce8' },
        100: { value: '#fef9c3' },
        200: { value: '#fef08a' },
        300: { value: '#fde047' },
        400: { value: '#facc15' },
        500: { value: '#eab308' }, // alternative for cat accent
        600: { value: '#ca8a04' },
        700: { value: '#a16207' },
        800: { value: '#854d0e' },
        900: { value: '#713f12' },
    },
    navy: {
        50:  { value: '#f3f4f6' },
        100: { value: '#e5e7eb' },
        200: { value: '#d1d5db' },
        300: { value: '#9ca3af' },
        400: { value: '#6b7280' },
        500: { value: '#374151' }, // main outline color
        600: { value: '#1f2937' },
        700: { value: '#111827' },
        800: { value: '#0f172a' },
        900: { value: '#0a0e1a' },
    }
}

const customConfig = defineConfig({
    theme: {
        tokens: {
            colors
        },
    },
})

export default createSystem(defaultConfig, customConfig);
