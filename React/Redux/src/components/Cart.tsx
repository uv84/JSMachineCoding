import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../store/slice/cartSlice';
import type { RootState, AppDispatch } from '../store/store';

const Cart: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, totalItems, totalPrice } = useSelector((state: RootState) => state.cartSlice);

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  if (items.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h2>Your Cart is Empty</h2>
        <p>Add some products to your cart to see them here.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Shopping Cart ({totalItems} items)</h2>
        <button 
          onClick={handleClearCart}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Clear Cart
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {items.map((item) => (
          <div key={item.id} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '15px',
            padding: '15px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            backgroundColor: '#fff'
          }}>
            <img 
              src={item.image} 
              alt={item.title} 
              style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} 
            />
            
            <div style={{ flex: 1 }}>
              <h4 style={{ margin: '0 0 5px 0' }}>{item.title}</h4>
              <p style={{ margin: '0', color: '#666' }}>${item.price}</p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button 
                onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                style={{
                  width: '30px',
                  height: '30px',
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                -
              </button>
              
              <span style={{ minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
              
              <button 
                onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                style={{
                  width: '30px',
                  height: '30px',
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                +
              </button>
            </div>

            <div style={{ textAlign: 'right', minWidth: '80px' }}>
              <p style={{ margin: '0', fontWeight: 'bold' }}>
                ${(item.quantity * item.price).toFixed(2)}
              </p>
            </div>

            <button 
              onClick={() => handleRemoveItem(item.id)}
              style={{
                padding: '5px 10px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div style={{ 
        marginTop: '20px', 
        padding: '20px', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        textAlign: 'right'
      }}>
        <h3 style={{ margin: '0' }}>Total: ${totalPrice.toFixed(2)}</h3>
        <button 
          style={{
            marginTop: '10px',
            padding: '12px 24px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;