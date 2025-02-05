import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth as authService } from '../service/authService.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await authService.getCurrentUser();
      setUser(user);
      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    const user = await authService.login(email, password);
    setUser(user);
    return user;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const forgetPassword = async (email) => {
    await authService.forgetPassword(email);
  };

  const resetPassword = async (token, newPassword) => {
    await authService.resetPassword(token, newPassword);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        forgetPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};