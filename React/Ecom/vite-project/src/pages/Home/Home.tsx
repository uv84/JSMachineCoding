
import React from 'react';
import { ProductList } from '../../components/product/ProductList';
import { useProducts } from '../../hooks/useProducts';
import './Home.css';

export const Home: React.FC = () => {
  const { data, isLoading, error } = useProducts(30, 0);

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to ShopEasy</h1>
          <p>Discover amazing products at great prices</p>
        </div>
      </div>
      
      <div className="products-section">
        <div className="container">
          <h2>Featured Products</h2>
          <ProductList 
            products={data?.products || []} 
            loading={isLoading}
            error={error?.message || null}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;