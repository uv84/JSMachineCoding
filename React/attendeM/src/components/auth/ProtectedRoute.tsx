import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginSuccess, logout } from '../../store/slices/authSlice';
import { authService } from '../../services/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles = [],
  redirectTo = '/login',
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth as any);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        if (currentUser && currentUser.isActive) {
          dispatch(loginSuccess(currentUser));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        dispatch(logout());
      } finally {
        setIsLoading(false);
      }
    };

    if (!isAuthenticated) {
      checkAuth();
    } else {
      setIsLoading(false);
    }
  }, [dispatch, isAuthenticated]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check if user has required role
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};