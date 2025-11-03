import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slice/productSlice';
import { addToCart } from '../store/slice/cartSlice';
import type { RootState, AppDispatch } from '../store/store';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
}

const Product: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector((state: RootState) => state.productSlice);
  const { items, totalItems, totalPrice } = useSelector((state: RootState) => state.cartSlice);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product: Product) => {
    dispatch(addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.thumbnail
    }));
  };

  if (loading) {
    return <div>Loading products...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
  <div>
    {/* Cart Summary */}
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f8f9fa', 
      borderBottom: '1px solid #ddd',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h3>Shopping Cart</h3>
      <div style={{ display: 'flex', gap: '20px' }}>
        <span>Items: {totalItems}</span>
        <span>Total: ${totalPrice.toFixed(2)}</span>
      </div>
    </div>

    {/* Cart Items */}
    {items.length > 0 && (
      <div style={{ padding: '20px', backgroundColor: '#fff' }}>
        <h4>Cart Items:</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {items.map((item) => (
            <div key={item.id} style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '15px',
              padding: '10px',
              border: '1px solid #eee',
              borderRadius: '4px'
            }}>
              <img src={item.image} alt={item.title} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <span>{item.title}</span>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  Quantity: {item.quantity} × ${item.price} = ${(item.quantity * item.price).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Products Section */}
    <div style={{ padding: '20px' }}>
      <h1>Products</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {products.map((product: Product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
            <img src={product.thumbnail} alt={product.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <h3>{product.title}</h3>
            <p style={{ color: '#666' }}>{product.category}</p>
            <p>{product.description}</p>
            <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#007bff' }}>${product.price}</p>
            <button 
              onClick={() => handleAddToCart(product)}
              style={{
                width: '100%',
                padding: '10px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
                marginTop: '10px'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0056b3'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Product;