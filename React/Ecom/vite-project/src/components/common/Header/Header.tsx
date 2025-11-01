import React, { useState } from 'react';
import { CartIcon } from '../../cart/CartIcon';
import './Header.css';

export const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-left">
          <h1 className="logo">ShopEasy</h1>
        </div>
        
        <div className="header-center">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              🔍
            </button>
          </form>
        </div>
        
        <div className="header-right">
          <CartIcon />
        </div>
      </div>
    </header>
  );
};