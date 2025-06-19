import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

const OtpLogin = () => {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const handleSendOtp = (e) => {
    e.preventDefault();
    // Simulate sending OTP
    console.log(`Sending OTP to: ${email}`);
    setOtpSent(true);
    // In a real app, you'd call an API here
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    // Simulate OTP verification
    console.log(`Verifying OTP: ${otp} for email: ${email}`);
    if (otp === '123456') { // Simple mock verification
      setOtpVerified(true);
    } else {
      alert('Invalid OTP. Please try again.');
    }
    // In a real app, you'd call an API here
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle final login logic
    console.log(`Logging in with email: ${email}`);
    alert('Logged in successfully!');
    // In a real app, you'd redirect or set user session
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4" style={{ background: theme.background.default }}>
      <div className="w-full max-w-md rounded-lg shadow-xl p-8 space-y-6" style={{ background: theme.components.card.background }}>
        <h2 className="text-3xl font-extrabold text-center" style={{ color: theme.text.primary }}>OTP Login</h2>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium" style={{ color: theme.text.primary }}>Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              required
              className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm"
              style={{
                borderColor: theme.components.input.border,
                color: theme.components.input.text,
                background: theme.components.input.background,
                '&:focus': { borderColor: theme.components.input.focus }
              }}
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={otpSent}
            />
          </div>

          {!otpSent ? (
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={!email}
              className="w-full flex justify-center py-2 px-4 border-transparent rounded-md shadow-sm text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: theme.components.button.primary.background,
                color: theme.components.button.primary.text,
                '&:hover': { backgroundColor: theme.components.button.primary.hover }
              }}
            >
              Send OTP
            </button>
          ) : (
            <div className="space-y-4">
              <div>
                <label htmlFor="otp" className="block text-sm font-medium" style={{ color: theme.text.primary }}>OTP</label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  required
                  className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm"
                  style={{
                    borderColor: theme.components.input.border,
                    color: theme.components.input.text,
                    background: theme.components.input.background,
                    '&:focus': { borderColor: theme.components.input.focus }
                  }}
                  placeholder="Enter 6-digit OTP"
                  maxLength="6"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={otpVerified}
                />
              </div>

              {!otpVerified ? (
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={!otp || otp.length !== 6}
                  className="w-full flex justify-center py-2 px-4 border-transparent rounded-md shadow-sm text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    backgroundColor: theme.components.button.primary.background,
                    color: theme.components.button.primary.text,
                    '&:hover': { backgroundColor: theme.components.button.primary.hover }
                  }}
                >
                  Verify OTP
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleLogin}
                  className="w-full flex justify-center py-2 px-4 border-transparent rounded-md shadow-sm text-sm font-medium"
                  style={{
                    backgroundColor: theme.components.button.primary.background,
                    color: theme.components.button.primary.text,
                    '&:hover': { backgroundColor: theme.components.button.primary.hover }
                  }}
                >
                  Login
                </button>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default OtpLogin;