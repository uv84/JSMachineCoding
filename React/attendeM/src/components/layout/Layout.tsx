import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { logout } from '../../store/slices/authSlice';
import { authService } from '../../services/auth';
import { LanguageSwitcher } from '../../i18n/LanguageSwitcher';

export const Layout: React.FC = () => {
  const intl = useIntl();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth as any);

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navigationItems = [
    { path: '/dashboard', label: 'nav.dashboard', roles: ['admin', 'employee', 'hr'] },
    { path: '/attendance', label: 'nav.attendance', roles: ['admin', 'employee', 'hr'] },
    { path: '/reports', label: 'nav.reports', roles: ['admin', 'hr'] },
    { path: '/users', label: 'nav.users', roles: ['admin', 'hr'] },
  ];

  const filteredNavigation = navigationItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-primary-600">AttendanceM</h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              {filteredNavigation.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  {intl.formatMessage({ id: item.label })}
                </NavLink>
              ))}
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <LanguageSwitcher className="hidden md:flex" />
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                  {user?.role}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="text-sm text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md hover:bg-gray-100 transition-colors"
              >
                {intl.formatMessage({ id: 'auth.logout' })}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 py-3 space-y-1">
            {filteredNavigation.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-100 text-primary-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                {intl.formatMessage({ id: item.label })}
              </NavLink>
            ))}
            <div className="px-3 py-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};