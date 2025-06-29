import React, { forwardRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const Input = forwardRef(({
    label,
    error,
    helperText,
    leftIcon,
    rightIcon,
    className = '',
    containerClassName = '',
    size = 'md',
    ...props
}, ref) => {
    const { theme } = useTheme();

    const sizes = {
        sm: 'px-3 py-2 text-sm',
        md: 'px-4 py-2.5 text-sm',
        lg: 'px-4 py-3 text-base'
    };

    const inputClasses = `
    ${sizes[size]}
    ${leftIcon ? 'pl-10' : ''}
    ${rightIcon ? 'pr-10' : ''}
    ${className}
    w-full
    border rounded-xl
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-4 focus:ring-opacity-50
    disabled:opacity-50 disabled:cursor-not-allowed
    placeholder-gray-400
  `;

    const inputStyle = {
        backgroundColor: theme.colors.white,
        borderColor: error ? theme.colors.danger : theme.colors.gray300,
        color: theme.colors.gray900,
        fontFamily: theme.typography.fontFamily.sans.join(', '),
        ':focus': {
            borderColor: error ? theme.colors.danger : theme.colors.primary,
            boxShadow: `0 0 0 4px ${error ? theme.colors.dangerLight : theme.colors.primaryLight}`,
        }
    };

    return (
        <div className={containerClassName}>
            {label && (
                <label className="block text-sm font-semibold mb-2" style={{ color: theme.colors.gray700 }}>
                    {label}
                </label>
            )}

            <div className="relative">
                {leftIcon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span style={{ color: theme.colors.gray400 }}>
                            {leftIcon}
                        </span>
                    </div>
                )}

                <input
                    ref={ref}
                    className={inputClasses}
                    style={inputStyle}
                    {...props}
                />

                {rightIcon && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                        <span style={{ color: theme.colors.gray400 }}>
                            {rightIcon}
                        </span>
                    </div>
                )}
            </div>

            {error && (
                <p className="mt-2 text-sm font-medium" style={{ color: theme.colors.danger }}>
                    {error}
                </p>
            )}

            {helperText && !error && (
                <p className="mt-2 text-sm" style={{ color: theme.colors.gray500 }}>
                    {helperText}
                </p>
            )}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;