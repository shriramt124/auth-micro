import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useTheme } from '../contexts/ThemeContext';

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required')
});

function ForgotPassword() {
    const theme = useTheme();
    const { resetPassword } = useAuth();

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                await resetPassword(values.email);
                // Handle success (e.g., show success message, redirect)
            } catch (error) {
                // Handle error
                console.error('Password reset error:', error);
            }
        }
    });

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ background: theme.background.default }}>
            <div className="w-full max-w-md rounded-2xl shadow-xl p-8" style={{ background: theme.components.card.background }}>
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2" style={{ color: theme.text.primary }}>Forgot Password</h1>
                    <p style={{ color: theme.text.secondary }}>
                        Enter your email address and we'll send you a link to reset your password.
                    </p>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: theme.text.primary }}>
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className="w-full px-4 py-2.5 rounded-lg border transition-all outline-none"
                            style={{
                                borderColor: formik.touched.email && formik.errors.email ? theme.components.input.error : theme.components.input.border,
                                color: theme.components.input.text,
                                background: theme.components.input.background,
                                '&:focus': { borderColor: theme.components.input.focus }
                            }}
                            placeholder="john@example.com"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-sm mt-1" style={{ color: theme.error.main }}>{formik.errors.email}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full font-semibold py-3 rounded-lg transition-all shadow-sm hover:shadow-md"
                        style={{
                            backgroundColor: theme.components.button.primary.background,
                            color: theme.components.button.primary.text,
                            '&:hover': { backgroundColor: theme.components.button.primary.hover }
                        }}
                    >
                        Send Reset Link
                    </button>

                    {/* Back to Login Link */}
                    <div className="text-center mt-4">
                        <Link
                            to="/login"
                            className="font-medium transition-colors"
                            style={{ color: theme.components.link.primary, '&:hover': { color: theme.components.link.hover } }}
                        >
                            Back to Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;