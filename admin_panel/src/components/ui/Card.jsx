import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const Card = ({
    children,
    className = '',
    hover = false,
    padding = 'p-6',
    shadow = 'md',
    border = true,
    ...props
}) => {
    const { theme } = useTheme();

    const baseClasses = `
    ${padding} 
    ${className}
    transition-all duration-300 ease-in-out
    ${hover ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer' : ''}
    ${border ? 'border border-gray-200' : ''}
  `;

    const cardStyle = {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius['2xl'],
        boxShadow: theme.shadows[shadow],
        border: border ? `1px solid ${theme.colors.gray200}` : 'none',
    };

    return (
        <div
            className={baseClasses}
            style={cardStyle}
            {...props}
        >
            {children}
        </div>
    );
};

export default Card;