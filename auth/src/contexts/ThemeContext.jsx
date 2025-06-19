import React, { createContext, useContext, useState } from 'react';
import lightTheme from '../config/lightTheme.json';
import darkTheme from '../config/darkTheme.json';

const ThemeContext = createContext();

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return {
        ...context.theme.colors,
        toggleTheme: context.toggleTheme,
        isDarkMode: context.isDarkMode
    };
};

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    
    const toggleTheme = () => {
        setIsDarkMode(prev => !prev);
    };

    const theme = isDarkMode ? darkTheme : lightTheme;

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};