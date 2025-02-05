// auth-mfe/src/authService.js
export const auth = {
    isAuthenticated: () => {
        const token = localStorage.getItem('authToken');
        return !!token && !isTokenExpired(token); // Add token expiration logic
    },
    login: async (email, password) => {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) {
                throw new Error('Failed to log in');
            }
            const data = await response.json();
            localStorage.setItem('authToken', data.token);
            return data;
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    },
    logout: async () => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                },
            });
            if (!response.ok) {
                throw new Error('Failed to log out');
            }
            localStorage.removeItem('authToken');
        } catch (error) {
            console.error('Error logging out:', error);
            throw error;
        }
    },
    forgetPassword: async (email) => {
        try {
            const response = await fetch('/api/auth/forget-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });
            if (!response.ok) {
                throw new Error('Failed to send password reset request');
            }
            return await response.json();
        } catch (error) {
            console.error('Error sending password reset request:', error);
            throw error;
        }
    },
    resetPassword: async (token, newPassword) => {
        try {
            const response = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token, newPassword }),
            });
            if (!response.ok) {
                throw new Error('Failed to reset password');
            }
            return await response.json();
        } catch (error) {
            console.error('Error resetting password:', error);
            throw error;
        }
    },
    signup: async (name, email, password) => {
        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });
            if (!response.ok) {
                throw new Error('Failed to sign up');
            }
            const data = await response.json();
            localStorage.setItem('authToken', data.token);
            return data;
        } catch (error) {
            console.error('Error signing up:', error);
            throw error;
        }
    }
};
