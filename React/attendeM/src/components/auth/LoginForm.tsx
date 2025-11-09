import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginStart, loginSuccess, loginFailure } from '../../store/slices/authSlice';
import { authService } from '../../services/auth';
import { LanguageSwitcher } from '../../i18n/LanguageSwitcher';

interface LoginFormProps {
  onSuccess?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const intl = useIntl();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth as any);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      dispatch(loginFailure(intl.formatMessage({ id: 'validation.required' })));
      return;
    }

    dispatch(loginStart());

    try {
      const result = await authService.login({
        email: formData.email,
        password: formData.password,
      });

      if (result.success && result.user) {
        dispatch(loginSuccess(result.user));
        onSuccess?.();
      } else {
        dispatch(loginFailure(result.error || intl.formatMessage({ id: 'auth.loginError' })));
      }
    } catch (error) {
      dispatch(loginFailure(intl.formatMessage({ id: 'auth.loginError' })));
    }
  };

  const handleDemoLogin = async (role: 'admin' | 'employee') => {
    const demoCredentials = {
      admin: { email: 'admin@company.com', password: 'password123' },
      employee: { email: 'employee@company.com', password: 'password123' },
    };

    setFormData(prev => ({
      ...prev,
      ...demoCredentials[role],
    }));

    dispatch(loginStart());

    try {
      const result = await authService.login(demoCredentials[role]);
      
      if (result.success && result.user) {
        dispatch(loginSuccess(result.user));
        onSuccess?.();
      } else {
        dispatch(loginFailure(result.error || intl.formatMessage({ id: 'auth.loginError' })));
      }
    } catch (error) {
      dispatch(loginFailure(intl.formatMessage({ id: 'auth.loginError' })));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <h1 className="text-3xl font-bold text-gray-900">AttendanceM</h1>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {intl.formatMessage({ id: 'auth.login' })}
          </h2>
          <div className="mt-4 flex justify-center">
            <LanguageSwitcher />
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                {intl.formatMessage({ id: 'auth.email' })}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder={intl.formatMessage({ id: 'auth.email' })}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                {intl.formatMessage({ id: 'auth.password' })}
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder={intl.formatMessage({ id: 'auth.password' })}
              />
            </div>

            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                {intl.formatMessage({ id: 'auth.rememberMe' })}
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading 
                ? intl.formatMessage({ id: 'common.loading' })
                : intl.formatMessage({ id: 'auth.login' })
              }
            </button>
          </div>

          <div className="space-y-2">
            <p className="text-center text-sm text-gray-600">Demo Accounts:</p>
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                disabled={loading}
                className="flex-1 py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Admin Demo
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('employee')}
                disabled={loading}
                className="flex-1 py-2 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Employee Demo
              </button>
            </div>
          </div>

          <div className="text-center">
            <button
              type="button"
              className="text-sm text-primary-600 hover:text-primary-500"
            >
              {intl.formatMessage({ id: 'auth.forgotPassword' })}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};