import React, { createContext, useContext } from 'react';

const ThemeContext = createContext();

const professionalTheme = {
    colors: {
        // Primary Brand Colors
        primary: '#2563eb',
        primaryHover: '#1d4ed8',
        primaryLight: '#dbeafe',
        primaryDark: '#1e40af',

        // Success Colors
        success: '#059669',
        successHover: '#047857',
        successLight: '#d1fae5',

        // Warning Colors
        warning: '#d97706',
        warningHover: '#b45309',
        warningLight: '#fef3c7',

        // Danger Colors
        danger: '#dc2626',
        dangerHover: '#b91c1c',
        dangerLight: '#fee2e2',

        // Info Colors
        info: '#0891b2',
        infoHover: '#0e7490',
        infoLight: '#cffafe',

        // Neutral Colors
        white: '#ffffff',
        gray50: '#f9fafb',
        gray100: '#f3f4f6',
        gray200: '#e5e7eb',
        gray300: '#d1d5db',
        gray400: '#9ca3af',
        gray500: '#6b7280',
        gray600: '#4b5563',
        gray700: '#374151',
        gray800: '#1f2937',
        gray900: '#111827',

        // Background Colors
        background: '#f8fafc',
        backgroundSecondary: '#f1f5f9',
        surface: '#ffffff',
        surfaceHover: '#f8fafc',
    },

    gradients: {
        primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        success: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
        warning: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        danger: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        info: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
        card: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },

    shadows: {
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    },

    borderRadius: {
        none: '0',
        sm: '0.125rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
    },

    spacing: {
        xs: '0.5rem',
        sm: '0.75rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
        '3xl': '4rem',
    },

    typography: {
        fontFamily: {
            sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
            mono: ['JetBrains Mono', 'Monaco', 'Cascadia Code', 'Segoe UI Mono', 'monospace'],
        },
        fontSize: {
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
            '5xl': '3rem',
        },
        fontWeight: {
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
            extrabold: '800',
        },
    },
};

export const ThemeProvider = ({ children }) => {
    return (
        <ThemeContext.Provider value={{ theme: professionalTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};