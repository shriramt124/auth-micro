import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

 

const forgotPasswordSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required')
});

function ForgotPassword() {
    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: forgotPasswordSchema,
        onSubmit: values => {
const { forgetPassword } = useAuth();

            // Handle password reset submission
            console.log(values);
forgetPassword(values.email);

        }
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Forgot Password</h1>
                    <p className="text-gray-500">
                        Remember your password?{' '}
                        <Link  to="/login" className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none text-gray-700"
                            placeholder="john@example.com"
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                        )}
                    </div>

                    {/* Info Text */}
                    <p className="text-sm text-gray-500 text-center">
                        We'll send you a link to reset your password
                    </p>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-all shadow-sm hover:shadow-md"
                    >
                        Send Reset Link
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;