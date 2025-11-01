import React from 'react';
import { Header } from '../Header';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <footer className="footer">
        <div className="footer-container">
          <p>&copy; 2025 ShopEasy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};