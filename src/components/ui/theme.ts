import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

export const colors = {
    gray: {
        0: {value: '#ffffff'},
        50: {value: '#f7fafc'},
        100: {value: '#f3f4f6'},
        200: {value: '#e5e7eb'},
        300: {value: '#d1d5db'},
        400: {value: '#9ca3af'},
        500: {value: '#6b7280'},
        600: {value: '#4b5563'},
        700: {value: '#374151'},
        800: {value: '#1f2937'},
        900: {value: '#111827'}
    },
    red: {
        50: {value: '#fef2f2'},
        100: {value: '#fdcccc'},
        200: {value: '#f99999'},
        300: {value: '#f66666'},
        400: {value: '#f23333'},
        500: {value: '#ef0000'},
        600: {value: '#cc0000'},
        700: {value: '#a90000'},
        800: {value: '#5f0000'},
        900: {value: '#330000'},
    },
    purple: {
        50: {value: '#f5f3ff'},
        100: {value: '#ede9fe'},
        200: {value: '#ddd6fe'},
        300: {value: '#c4b5fd'},
        400: {value: '#a78bfa'},
        500: {value: '#8b5cf6'},
        600: {value: '#7c3aed'},
        700: {value: '#6d28d9'},
        800: {value: '#5b21b6'},
        900: {value: '#4c1d95'}
    },
    blue: {
        50: {value: '#e6f0fc'},
        100: {value: '#cce1f9'},
        200: {value: '#99c3f3'},
        300: {value: '#66a4ed'},
        400: {value: '#3386e7'},
        500: {value: '#0068e1'},
        600: {value: '#0053b4'},
        700: {value: '#003d8b'},
        800: {value: '#002860'},
        900: {value: '#00152d'},
    },
    green: {
        50: {value: '#e6fffa'},
        100: {value: '#b2f5ea'},
        200: {value: '#81e6d9'},
        300: {value: '#4fd1c5'},
        400: {value: '#38b2ac'},
        500: {value: '#319795'},
        600: {value: '#2c7a7b'},
        700: {value: '#285e61'},
        800: {value: '#234e52'},
        900: {value: '#1d4044'}
    },
    yellow: {
        50: {value: '#fffbeb'},
        100: {value: '#fef3c7'},
        200: {value: '#fde68a'},
        300: {value: '#fcd34d'},
        400: {value: '#fbbf24'},
        500: {value: '#ffcf00'},
        600: {value: '#ccaa00'},
        700: {value: '#998000'},
        800: {value: '#5f5000'},
        900: {value: '#333000'},
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
