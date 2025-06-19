import React, { createContext, useContext } from 'react';
import themeConfig from '../config/theme.json';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context.colors;
};

export const ThemeProvider = ({ children }) => {
    return (
        <ThemeContext.Provider value={themeConfig}>
            {children}
        </ThemeContext.Provider>
    );
};