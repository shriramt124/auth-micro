import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useTheme } from '../contexts/ThemeContext';

 
const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
    agree: Yup.boolean()
        .oneOf([true], 'You must accept the terms and privacy policy')
        .required()
});

function Signup() {
    const theme = useTheme();
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            agree: false
        },
        validationSchema,
        onSubmit: values => {
const { signup } = useAuth();

            // Handle form submission
            console.log(values);
signup(values.name, values.email, values.password);

        }
    });

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ background: theme.background.default }}>
            <div className="w-full max-w-md rounded-2xl shadow-xl p-8" style={{ background: theme.components.card.background }}>
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2" style={{ color: theme.text.primary }}>Create Your Account</h1>
                    <p style={{ color: theme.text.secondary }}>
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium transition-colors" style={{ color: theme.components.link.primary, '&:hover': { color: theme.components.link.hover } }}>
                            Sign in
                        </Link>
                    </p>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    {/* Name Input */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1" style={{ color: theme.text.primary }}>
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            className="w-full px-4 py-2.5 rounded-lg border transition-all outline-none"
                            style={{
                                borderColor: formik.touched.name && formik.errors.name ? theme.components.input.error : theme.components.input.border,
                                color: theme.components.input.text,
                                background: theme.components.input.background,
                                '&:focus': { borderColor: theme.components.input.focus }
                            }}
                            placeholder="John Doe"
                        />
                        {formik.touched.name && formik.errors.name && (
                            <p className="text-sm mt-1" style={{ color: theme.error.main }}>{formik.errors.name}</p>
                        )}
                    </div>

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

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-1" style={{ color: theme.text.primary }}>
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            className="w-full px-4 py-2.5 rounded-lg border transition-all outline-none"
                            style={{
                                borderColor: formik.touched.password && formik.errors.password ? theme.components.input.error : theme.components.input.border,
                                color: theme.components.input.text,
                                background: theme.components.input.background,
                                '&:focus': { borderColor: theme.components.input.focus }
                            }}
                            placeholder="••••••••"
                        />
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-sm mt-1" style={{ color: theme.error.main }}>{formik.errors.password}</p>
                        )}
                    </div>

                    {/* Confirm Password Input */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1" style={{ color: theme.text.primary }}>
                            Confirm Password
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

                    {/* Checkbox */}
                    <div className="flex items-start space-x-2">
                        <input
                            type="checkbox"
                            id="agree"
                            name="agree"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            checked={formik.values.agree}
                            className="mt-1 w-4 h-4 rounded"
                            style={{
                                borderColor: theme.components.checkbox.border,
                                backgroundColor: formik.values.agree ? theme.components.checkbox.checked : theme.components.checkbox.background
                            }}
                        />
                        <label htmlFor="agree" className="text-sm" style={{ color: theme.text.secondary }}>
                            I agree with{' '}
                            <Link to="/terms" className="font-medium transition-colors" style={{ color: theme.components.link.primary, '&:hover': { color: theme.components.link.hover } }}>
                                Terms
                            </Link>{' '}
                            and{' '}
                            <Link to="/privacy" className="font-medium transition-colors" style={{ color: theme.components.link.primary, '&:hover': { color: theme.components.link.hover } }}>
                                Privacy Policy
                            </Link>
                        </label>
                    </div>
                    {formik.touched.agree && formik.errors.agree && (
                        <p className="text-sm -mt-4" style={{ color: theme.error.main }}>{formik.errors.agree}</p>
                    )}

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
                        Create Free Account
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;