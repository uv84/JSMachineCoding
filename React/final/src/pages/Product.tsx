import React from 'react'
import { Link, useLocation } from 'react-router'

// Breadcrumb Component
const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x); 

  const breadcrumbNameMap: { [key: string]: string } = {
    'main': 'Home',
    'product': 'Products',
    '1': 'Product Details',
    '2': 'Product 2',
    '3': 'Product 3',
    'category': 'Categories',
    'electronics': 'Electronics',
    'clothing': 'Clothing'
  };

  return (
    <nav>
      <ol>
        {/* Home Link */}
        <li>
          <Link to="/">🏠 Home</Link>
        </li>

        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const displayName = breadcrumbNameMap[name] || name.charAt(0).toUpperCase() + name.slice(1);

          return (
            <li key={name}>
              <span>/</span>
              {isLast ? (
                <span>{displayName}</span>
              ) : (
                <Link to={routeTo}>{displayName}</Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

function Product() {
  let location = useLocation();
  
  return (
    <div>
      <Breadcrumb />
      
      <h1>Products Page</h1>
      <p>Current path: {location.pathname}</p>

      <div>
        <h2>Product Links</h2>
        <ul>
          <li><Link to="/pages/product1">Product 1 Page</Link></li>
          <li><Link to="/pages/product2">Product 2 Page</Link></li>
          <li><Link to="/pages/product3">Product 3 Page</Link></li>
          <li><Link to="/pages/category">Category Page</Link></li>
          <li><Link to="/pages/electronics">Electronics Page</Link></li>
          <li><Link to="/pages/clothing">Clothing Page</Link></li>
        </ul>
      </div>

      <div>
        <h3>Navigation</h3>
        <ul>
          <li><Link to="/main">Back to Main</Link></li>
          <li><Link to="/pages">Pages Folder</Link></li>
        </ul>
      </div>
    </div>
  )
}

export default Product