import React from 'react';
import type { CartItem as CartItemType } from '../../../types/cart';
import { formatPrice } from '../../../utils/helpers';
import { useAppDispatch } from '../../../hooks/redux';
import { updateQuantity, removeFromCart } from '../../../store/slices/cartSlice';
import './CartItem.css';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch(removeFromCart(item.product.id));
    } else {
      dispatch(updateQuantity({ productId: item.product.id, quantity: newQuantity }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.product.id));
  };

  const itemTotal = item.product.price * item.quantity;

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.product.thumbnail} alt={item.product.title} />
      </div>
      
      <div className="cart-item-details">
        <h4 className="cart-item-title">{item.product.title}</h4>
        <p className="cart-item-brand">{item.product.brand}</p>
        <p className="cart-item-price">{formatPrice(item.product.price)}</p>
      </div>
      
      <div className="cart-item-quantity">
        <button 
          className="quantity-btn"
          onClick={() => handleQuantityChange(item.quantity - 1)}
          disabled={item.quantity <= 1}
        >
          -
        </button>
        <span className="quantity-display">{item.quantity}</span>
        <button 
          className="quantity-btn"
          onClick={() => handleQuantityChange(item.quantity + 1)}
        >
          +
        </button>
      </div>
      
      <div className="cart-item-total">
        <span className="item-total">{formatPrice(itemTotal)}</span>
        <button className="remove-btn" onClick={handleRemove}>
          Remove
        </button>
      </div>
    </div>
  );
};