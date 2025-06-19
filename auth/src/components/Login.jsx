import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useTheme } from '../contexts/ThemeContext';
 
const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .required('Password is required')
});

function Login() {
    const theme = useTheme();
   
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: loginSchema,
        onSubmit: async values => {
            await handleSubmit(values);
        }
    });

    const handleSubmit = async (values) => {
const { login } = useAuth();

      
      
        
login(values.email, values.password);

    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ background: theme.background.default }}>
            <div className="w-full max-w-md rounded-2xl shadow-xl p-8" style={{ background: theme.components.card.background }}>
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold mb-2" style={{ color: theme.text.primary }}>Welcome Back</h1>
                    <p style={{ color: theme.text.secondary }}>
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium transition-colors" style={{ color: theme.components.link.primary, '&:hover': { color: theme.components.link.hover } }}>
                            Register
                        </Link>
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

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 rounded"
                                style={{
                                    borderColor: theme.components.checkbox.border,
                                    backgroundColor: theme.components.checkbox.background
                                }}
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-sm" style={{ color: theme.text.secondary }}>
                                Remember me
                            </label>
                        </div>
                        <div className="text-sm">
                            <Link to="/forgot-password" className="font-medium transition-colors" style={{ color: theme.components.link.primary, '&:hover': { color: theme.components.link.hover } }}>
                                Forgot password?
                            </Link>
                        </div>
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
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;