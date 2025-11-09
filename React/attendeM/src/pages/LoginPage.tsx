import React from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { useNavigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/dashboard', { replace: true });
  };

  return <LoginForm onSuccess={handleLoginSuccess} />;
};