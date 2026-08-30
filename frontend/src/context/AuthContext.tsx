import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
  switchPersona: (role: User['role']) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: Record<User['role'], User> = {
  STUDENT: { id: 1, username: 'alex_chen', email: 'alex.chen@student.edu', fullName: 'Alex Chen', role: 'STUDENT' },
  ACADEMICIAN: { id: 2, username: 'sarah_jenkins', email: 'sarah.jenkins@nit.edu', fullName: 'Dr. Sarah Jenkins', role: 'ACADEMICIAN' },
  INDUSTRY: { id: 3, username: 'marcus_vance', email: 'marcus.vance@vmware.com', fullName: 'Marcus Vance', role: 'INDUSTRY' },
  INSTITUTION_ADMIN: { id: 4, username: 'dean_raman', email: 'dean@nit.edu', fullName: 'Dean Dr. Raman', role: 'INSTITUTION_ADMIN' }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('skillintel_user');
    return savedUser ? JSON.parse(savedUser) : DEMO_USERS.STUDENT;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('skillintel_token') || 'demo-jwt-token';
  });

  useEffect(() => {
    if (user) localStorage.setItem('skillintel_user', JSON.stringify(user));
    else localStorage.removeItem('skillintel_user');

    if (token) localStorage.setItem('skillintel_token', token);
    else localStorage.removeItem('skillintel_token');
  }, [user, token]);

  const login = (newUser: User, newToken: string) => {
    setUser(newUser);
    setToken(newToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('skillintel_user');
    localStorage.removeItem('skillintel_token');
  };

  const switchPersona = (role: User['role']) => {
    const demoUser = DEMO_USERS[role] || DEMO_USERS.STUDENT;
    setUser(demoUser);
    setToken(`demo-jwt-token-${role.toLowerCase()}`);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user && !!token, login, logout, switchPersona }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
