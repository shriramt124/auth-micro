import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    fullWidth = false,
    className = '',
    onClick,
    icon,
    ...props
}) => {
    const { theme } = useTheme();

    const variants = {
        primary: {
            backgroundColor: theme.colors.primary,
            color: theme.colors.white,
            border: `1px solid ${theme.colors.primary}`,
            ':hover': {
                backgroundColor: theme.colors.primaryHover,
                transform: 'translateY(-1px)',
                boxShadow: theme.shadows.md,
            }
        },
        secondary: {
            backgroundColor: theme.colors.white,
            color: theme.colors.gray700,
            border: `1px solid ${theme.colors.gray300}`,
            ':hover': {
                backgroundColor: theme.colors.gray50,
                borderColor: theme.colors.gray400,
            }
        },
        success: {
            backgroundColor: theme.colors.success,
            color: theme.colors.white,
            border: `1px solid ${theme.colors.success}`,
            ':hover': {
                backgroundColor: theme.colors.successHover,
                transform: 'translateY(-1px)',
                boxShadow: theme.shadows.md,
            }
        },
        danger: {
            backgroundColor: theme.colors.danger,
            color: theme.colors.white,
            border: `1px solid ${theme.colors.danger}`,
            ':hover': {
                backgroundColor: theme.colors.dangerHover,
                transform: 'translateY(-1px)',
                boxShadow: theme.shadows.md,
            }
        },
        warning: {
            backgroundColor: theme.colors.warning,
            color: theme.colors.white,
            border: `1px solid ${theme.colors.warning}`,
            ':hover': {
                backgroundColor: theme.colors.warningHover,
                transform: 'translateY(-1px)',
                boxShadow: theme.shadows.md,
            }
        },
        outline: {
            backgroundColor: 'transparent',
            color: theme.colors.primary,
            border: `2px solid ${theme.colors.primary}`,
            ':hover': {
                backgroundColor: theme.colors.primary,
                color: theme.colors.white,
            }
        }
    };

    const sizes = {
        xs: 'px-2.5 py-1.5 text-xs font-medium',
        sm: 'px-3 py-2 text-sm font-medium',
        md: 'px-4 py-2.5 text-sm font-medium',
        lg: 'px-6 py-3 text-base font-medium',
        xl: 'px-8 py-4 text-lg font-medium'
    };

    const baseClasses = `
    ${sizes[size]} 
    ${fullWidth ? 'w-full' : ''} 
    ${className}
    inline-flex items-center justify-center
    border rounded-xl
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-4 focus:ring-opacity-50
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    font-semibold tracking-wide
    ${icon && children ? 'gap-2' : ''}
  `;

    const buttonStyle = {
        ...variants[variant],
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        fontFamily: theme.typography.fontFamily.sans.join(', '),
    };

    return (
        <button
            className={baseClasses}
            style={buttonStyle}
            disabled={disabled || loading}
            onClick={onClick}
            {...props}
        >
            {loading && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            )}
            {icon && !loading && icon}
            {children}
        </button>
    );
};

export default Button;