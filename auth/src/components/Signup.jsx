import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

 
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Your Account</h1>
                    <p className="text-gray-500">
                        Already have an account?{' '}
                        <Link  to="/login" className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    {/* Name Input */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none text-gray-700"
                            placeholder="John Doe"
                        />
                        {formik.touched.name && formik.errors.name && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
                        )}
                    </div>

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

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none text-gray-700"
                            placeholder="••••••••"
                        />
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
                        )}
                    </div>

                    {/* Confirm Password Input */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmPassword}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none text-gray-700"
                            placeholder="••••••••"
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.confirmPassword}</p>
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
                            className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor="agree" className="text-sm text-gray-600">
                            I agree with{' '}
                            <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">
                                Terms
                            </a>{' '}
                            and{' '}
                            <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium">
                                Privacy Policy
                            </a>
                        </label>
                    </div>
                    {formik.touched.agree && formik.errors.agree && (
                        <p className="text-red-500 text-sm -mt-4">{formik.errors.agree}</p>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-all shadow-sm hover:shadow-md"
                    >
                        Create Free Account
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;