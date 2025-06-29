import React, { useState, useEffect, createContext, useContext } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react';

const ToastContext = createContext();

const Toast = ({ toast, onRemove }) => {
    const { theme } = useTheme();
    const [isVisible, setIsVisible] = useState(false);
    const [isRemoving, setIsRemoving] = useState(false);

    useEffect(() => {
        setIsVisible(true);
        const timer = setTimeout(() => {
            handleRemove();
        }, toast.duration || 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleRemove = () => {
        setIsRemoving(true);
        setTimeout(() => {
            onRemove(toast.id);
        }, 300);
    };

    const icons = {
        success: <CheckCircle size={20} />,
        error: <XCircle size={20} />,
        warning: <AlertTriangle size={20} />,
        info: <Info size={20} />
    };

    const colors = {
        success: {
            bg: theme.colors.successLight,
            border: theme.colors.success,
            text: theme.colors.success,
            icon: theme.colors.success
        },
        error: {
            bg: theme.colors.dangerLight,
            border: theme.colors.danger,
            text: theme.colors.danger,
            icon: theme.colors.danger
        },
        warning: {
            bg: theme.colors.warningLight,
            border: theme.colors.warning,
            text: theme.colors.warning,
            icon: theme.colors.warning
        },
        info: {
            bg: theme.colors.infoLight,
            border: theme.colors.info,
            text: theme.colors.info,
            icon: theme.colors.info
        }
    };

    const toastStyle = {
        backgroundColor: colors[toast.type].bg,
        borderLeft: `4px solid ${colors[toast.type].border}`,
        borderRadius: theme.borderRadius.xl,
        boxShadow: theme.shadows.lg,
        padding: '1rem 1.25rem',
        marginBottom: '0.75rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.75rem',
        minWidth: '320px',
        maxWidth: '480px',
        transform: isRemoving ? 'translateX(100%)' : isVisible ? 'translateX(0)' : 'translateX(100%)',
        opacity: isRemoving ? 0 : isVisible ? 1 : 0,
        transition: 'all 0.3s ease-in-out',
        border: `1px solid ${colors[toast.type].border}20`,
    };

    return (
        <div style={toastStyle}>
            <div style={{ color: colors[toast.type].icon, flexShrink: 0, marginTop: '2px' }}>
                {icons[toast.type]}
            </div>

            <div className="flex-1">
                {toast.title && (
                    <div
                        className="font-semibold text-sm mb-1"
                        style={{ color: colors[toast.type].text }}
                    >
                        {toast.title}
                    </div>
                )}
                <div
                    className="text-sm"
                    style={{ color: theme.colors.gray700 }}
                >
                    {toast.message}
                </div>
            </div>

            <button
                onClick={handleRemove}
                className="p-1 hover:bg-black hover:bg-opacity-10 rounded-full transition-colors duration-200"
                style={{ color: theme.colors.gray500 }}
            >
                <X size={16} />
            </button>
        </div>
    );
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = (message, type = 'success', options = {}) => {
        const id = Date.now() + Math.random();
        const toast = {
            id,
            message,
            type,
            title: options.title,
            duration: options.duration || 5000,
            ...options
        };

        setToasts(prev => [...prev, toast]);
        return id;
    };

    const removeToast = (id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    const removeAllToasts = () => {
        setToasts([]);
    };

    return (
        <ToastContext.Provider value={{ addToast, removeToast, removeAllToasts }}>
            {children}
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </ToastContext.Provider>
    );
};

const ToastContainer = ({ toasts, onRemove }) => {
    if (toasts.length === 0) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: '1rem',
                right: '1rem',
                zIndex: 1000,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
            }}
        >
            {toasts.map(toast => (
                <Toast
                    key={toast.id}
                    toast={toast}
                    onRemove={onRemove}
                />
            ))}
        </div>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export default Toast;