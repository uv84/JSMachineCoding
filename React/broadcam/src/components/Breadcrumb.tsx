import { useLocation, Link } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const breadcrumbMap: { [key: string]: string } = {
    'about': 'About',
    'page1': 'Page 1',
    'page2': 'Page 2'
  };

  return (
    <nav aria-label="breadcrumb" style={{ padding: '10px 0', marginBottom: '20px' }}>
      <ol style={{ 
        display: 'flex', 
        listStyle: 'none', 
        margin: 0, 
        padding: 0,
        alignItems: 'center'
      }}>
        <li>
          <Link 
            to="/" 
            style={{ 
              textDecoration: 'none', 
              color: '#646cff',
              fontWeight: 'bold'
            }}
          >
            Home
          </Link>
        </li>
        
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          
          return (
            <li key={name} style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ margin: '0 8px', color: '#666' }}>/</span>
              {isLast ? (
                <span style={{ color: '#333', fontWeight: 'bold' }}>
                  {breadcrumbMap[name] || name}
                </span>
              ) : (
                <Link 
                  to={routeTo}
                  style={{ 
                    textDecoration: 'none', 
                    color: '#646cff',
                    fontWeight: 'bold'
                  }}
                >
                  {breadcrumbMap[name] || name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb; 