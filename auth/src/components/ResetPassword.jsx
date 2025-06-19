import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useTheme } from '../contexts/ThemeContext';


const resetPasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm Password is required')
});

function ResetPassword() {
    const theme = useTheme();
    const formik = useFormik({
        initialValues: {
            newPassword: '',
            confirmPassword: ''
        },
        validationSchema: resetPasswordSchema,
        onSubmit: values => {
const { resetPassword } = useAuth();

            // Handle password reset submission
            console.log(values);
resetPassword(values.token, values.newPassword);

        }
    });

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ background: theme.background.default }}>
            <div className="w-full max-w-md rounded-2xl shadow-xl p-8" style={{ background: theme.components.card.background }}>
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2" style={{ color: theme.text.primary }}>Reset Password</h1>
                    <p style={{ color: theme.text.secondary }}>
                        Return to{' '}
                        <Link to="/" className="font-medium transition-colors" style={{ color: theme.components.link.primary, '&:hover': { color: theme.components.link.hover } }}>
                            Sign in
                        </Link>
                    </p>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    {/* New Password Input */}
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium mb-1" style={{ color: theme.text.primary }}>
                            New Password
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.newPassword}
                            className="w-full px-4 py-2.5 rounded-lg border transition-all outline-none"
                            style={{
                                borderColor: formik.touched.newPassword && formik.errors.newPassword ? theme.components.input.error : theme.components.input.border,
                                color: theme.components.input.text,
                                background: theme.components.input.background,
                                '&:focus': { borderColor: theme.components.input.focus }
                            }}
                            placeholder="••••••••"
                        />
                        {formik.touched.newPassword && formik.errors.newPassword && (
                            <p className="text-sm mt-1" style={{ color: theme.error.main }}>{formik.errors.newPassword}</p>
                        )}
                    </div>

                    {/* Confirm Password Input */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1" style={{ color: theme.text.primary }}>
                            Confirm New Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmPassword}
                            className="w-full px-4 py-2.5 rounded-lg border transition-all outline-none"
                            style={{
                                borderColor: formik.touched.confirmPassword && formik.errors.confirmPassword ? theme.components.input.error : theme.components.input.border,
                                color: theme.components.input.text,
                                background: theme.components.input.background,
                                '&:focus': { borderColor: theme.components.input.focus }
                            }}
                            placeholder="••••••••"
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                            <p className="text-sm mt-1" style={{ color: theme.error.main }}>{formik.errors.confirmPassword}</p>
                        )}
                    </div>

                    {/* Info Text */}
                    <p className="text-sm text-center" style={{ color: theme.text.hint }}>
                        Your new password must be different from previous used passwords
                    </p>

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
                        
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;