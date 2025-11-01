import React from 'react';
import { useAppSelector } from '../../../hooks/redux';
import './CartIcon.css';

interface CartIconProps {
  onClick?: () => void;
}

export const CartIcon: React.FC<CartIconProps> = ({ onClick }) => {
  const { itemCount, total } = useAppSelector((state) => state.cart);

  return (
    <div className="cart-icon" onClick={onClick}>
      <div className="cart-icon-wrapper">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="m1 1 4 4 0 0 m0 0 2 11h9l4-7H7"></path>
        </svg>
        {itemCount > 0 && (
          <span className="cart-badge">{itemCount}</span>
        )}
      </div>
      <div className="cart-info">
        <span className="cart-count">{itemCount} items</span>
        <span className="cart-total">${total.toFixed(2)}</span>
      </div>
    </div>
  );
};