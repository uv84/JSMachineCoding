import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { I18nProvider } from './i18n/I18nProvider';
import { dbService } from './services/database';

// Pages
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { AttendancePage } from './pages/AttendancePage';
import { UsersPage } from './pages/UsersPage';

// Components
import { Layout } from './components/layout/Layout';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {
  useEffect(() => {
    // Initialize database on app start
    dbService.init().catch(console.error);
  }, []);

  return (
    <Provider store={store}>
      <I18nProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            
            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route
                path="attendance"
                element={
                  <ProtectedRoute>
                    <AttendancePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="reports"
                element={
                  <ProtectedRoute allowedRoles={['admin', 'hr']}>
                    <div className="p-6 text-center">
                      <h2 className="text-2xl font-bold">Reports Page</h2>
                      <p>Coming soon...</p>
                    </div>
                  </ProtectedRoute>
                }
              />
              <Route
                path="users"
                element={
                  <ProtectedRoute allowedRoles={['admin', 'hr']}>
                    <UsersPage />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Unauthorized Page */}
            <Route
              path="/unauthorized"
              element={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-red-600">403</h1>
                    <p className="text-xl text-gray-600">Unauthorized Access</p>
                    <p className="text-gray-500">You don't have permission to access this page.</p>
                  </div>
                </div>
              }
            />

            {/* 404 Page */}
            <Route
              path="*"
              element={
                <div className="min-h-screen flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800">404</h1>
                    <p className="text-xl text-gray-600">Page Not Found</p>
                  </div>
                </div>
              }
            />
          </Routes>
        </Router>
      </I18nProvider>
    </Provider>
  );
}

export default App;
