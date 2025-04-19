
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(undefined);

// Mock admin user
const ADMIN_USER = {
  id: 'admin-123',
  email: 'admin@freshharvestbulk.com',
  role: 'admin'
};

// Mock admin credentials
const ADMIN_CREDENTIALS = {
  email: 'admin@freshharvestbulk.com',
  password: 'admin123'
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    // This is a mock authentication - in a real app, you'd call an API
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      setUser(ADMIN_USER);
      localStorage.setItem('user', JSON.stringify(ADMIN_USER));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
