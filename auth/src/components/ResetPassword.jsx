import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../contexts/AuthContext.jsx';


const resetPasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm Password is required')
});

function ResetPassword() {
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Reset Password</h1>
                    <p className="text-gray-500">
                        Return to{' '}
                        <a href="#" className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                            Sign in
                        </a>
                    </p>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    {/* New Password Input */}
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.newPassword}
                            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none text-gray-700"
                            placeholder="••••••••"
                        />
                        {formik.touched.newPassword && formik.errors.newPassword && (
                            <p className="text-red-500 text-sm mt-1">{formik.errors.newPassword}</p>
                        )}
                    </div>

                    {/* Confirm Password Input */}
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                            Confirm New Password
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

                    {/* Info Text */}
                    <p className="text-sm text-gray-500 text-center">
                        Your new password must be different from previous used passwords
                    </p>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-all shadow-sm hover:shadow-md"
                    >
                        
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;