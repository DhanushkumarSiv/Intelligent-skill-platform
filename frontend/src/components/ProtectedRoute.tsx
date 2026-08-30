import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShieldAlert, Lock, ArrowRight, UserCheck } from 'lucide-react';
import { User } from '../types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: User['role'][];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, switchPersona } = useAuth();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    const targetRole = allowedRoles[0];

    return (
      <div className="max-w-xl mx-auto my-12 animate-fade-in">
        <div className="glass-card rounded-2xl p-8 border border-red-500/30 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto text-red-400">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-white">403 — Restricted Role Access</h1>
            <p className="text-xs text-slate-300">
              Your current logged-in role (<strong className="text-amber-400">{user.role}</strong>) does not have authorization to view this institutional section.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
            Required Permission Role: <strong className="text-emerald-400">{allowedRoles.join(' OR ')}</strong>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => switchPersona(targetRole)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-blue-600 font-bold text-white text-xs shadow-lg shadow-emerald-500/20 hover:opacity-90 transition flex items-center justify-center space-x-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>Switch to {targetRole} Role</span>
            </button>

            <button
              onClick={() => window.history.back()}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold text-slate-300 text-xs border border-slate-700 transition"
            >
              Return Previous Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
