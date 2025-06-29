import React, { useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { X } from 'lucide-react';
import Button from './Button';

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    footer,
    size = 'md',
    closeOnOverlayClick = true,
    showCloseButton = true,
}) => {
    const { theme } = useTheme();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const sizes = {
        sm: 'max-w-md',
        md: 'max-w-lg',
        lg: 'max-w-2xl',
        xl: 'max-w-4xl',
        full: 'max-w-full mx-4'
    };

    const overlayStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(4px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem',
        animation: 'fadeIn 0.2s ease-out',
    };

    const modalStyle = {
        backgroundColor: theme.colors.white,
        borderRadius: theme.borderRadius['2xl'],
        boxShadow: theme.shadows['2xl'],
        width: '100%',
        maxHeight: '90vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideIn 0.3s ease-out',
    };

    return (
        <>
            <style>
                {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideIn {
            from { 
              opacity: 0; 
              transform: translateY(-20px) scale(0.95); 
            }
            to { 
              opacity: 1; 
              transform: translateY(0) scale(1); 
            }
          }
        `}
            </style>

            <div
                style={overlayStyle}
                onClick={closeOnOverlayClick ? onClose : undefined}
            >
                <div
                    className={sizes[size]}
                    style={modalStyle}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div
                        className="flex items-center justify-between p-6 border-b"
                        style={{ borderColor: theme.colors.gray200 }}
                    >
                        <h3
                            className="text-xl font-bold"
                            style={{ color: theme.colors.gray900 }}
                        >
                            {title}
                        </h3>
                        {showCloseButton && (
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                                style={{ color: theme.colors.gray500 }}
                            >
                                <X size={20} />
                            </button>
                        )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        {children}
                    </div>

                    {/* Footer */}
                    {footer && (
                        <div
                            className="flex justify-end gap-3 p-6 border-t bg-gray-50"
                            style={{ borderColor: theme.colors.gray200 }}
                        >
                            {footer}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Modal;