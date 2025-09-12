import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

const StocksWidget = ({ type = 'stocks' }) => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 700));
        
        // Mock stock data
        const mockStocksData = type === 'crypto' ? [
          {
            symbol: 'BTC',
            name: 'Bitcoin',
            price: (Math.random() * 50000 + 30000).toFixed(2),
            change: (Math.random() * 20 - 10).toFixed(2),
            changePercent: (Math.random() * 10 - 5).toFixed(2)
          },
          {
            symbol: 'ETH',
            name: 'Ethereum',
            price: (Math.random() * 3000 + 2000).toFixed(2),
            change: (Math.random() * 200 - 100).toFixed(2),
            changePercent: (Math.random() * 10 - 5).toFixed(2)
          },
          {
            symbol: 'ADA',
            name: 'Cardano',
            price: (Math.random() * 2 + 0.5).toFixed(3),
            change: (Math.random() * 0.2 - 0.1).toFixed(3),
            changePercent: (Math.random() * 10 - 5).toFixed(2)
          },
          {
            symbol: 'SOL',
            name: 'Solana',
            price: (Math.random() * 200 + 100).toFixed(2),
            change: (Math.random() * 20 - 10).toFixed(2),
            changePercent: (Math.random() * 10 - 5).toFixed(2)
          }
        ] : [
          {
            symbol: 'AAPL',
            name: 'Apple Inc.',
            price: (Math.random() * 50 + 150).toFixed(2),
            change: (Math.random() * 10 - 5).toFixed(2),
            changePercent: (Math.random() * 5 - 2.5).toFixed(2)
          },
          {
            symbol: 'GOOGL',
            name: 'Alphabet Inc.',
            price: (Math.random() * 100 + 2500).toFixed(2),
            change: (Math.random() * 50 - 25).toFixed(2),
            changePercent: (Math.random() * 5 - 2.5).toFixed(2)
          },
          {
            symbol: 'MSFT',
            name: 'Microsoft Corp.',
            price: (Math.random() * 50 + 300).toFixed(2),
            change: (Math.random() * 10 - 5).toFixed(2),
            changePercent: (Math.random() * 5 - 2.5).toFixed(2)
          },
          {
            symbol: 'TSLA',
            name: 'Tesla Inc.',
            price: (Math.random() * 100 + 200).toFixed(2),
            change: (Math.random() * 20 - 10).toFixed(2),
            changePercent: (Math.random() * 5 - 2.5).toFixed(2)
          },
          {
            symbol: 'AMZN',
            name: 'Amazon.com Inc.',
            price: (Math.random() * 50 + 3000).toFixed(2),
            change: (Math.random() * 100 - 50).toFixed(2),
            changePercent: (Math.random() * 5 - 2.5).toFixed(2)
          }
        ];
        
        setStocks(mockStocksData);
      } catch (err) {
        setError('Failed to load stock data');
        console.error('Stocks fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, [type]);

  if (loading) {
    return (
      <div className="loading">
        <DollarSign className="widget-icon" style={{ marginRight: '8px' }} />
        Loading {type} data...
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!stocks || stocks.length === 0) {
    return <div className="error">No {type} data available</div>;
  }

  return (
    <div>
      <div className="stocks-grid">
        {stocks.map((stock) => {
          const isPositive = parseFloat(stock.change) >= 0;
          const isPositivePercent = parseFloat(stock.changePercent) >= 0;
          
          return (
            <div key={stock.symbol} className="stock-item">
              <div className="stock-info">
                <div className="stock-symbol">{stock.symbol}</div>
                <div className="stock-name">{stock.name}</div>
              </div>
              <div className="stock-price">
                <div className="stock-current">${stock.price}</div>
                <div className={`stock-change ${isPositive ? 'positive' : 'negative'}`}>
                  {isPositive ? (
                    <TrendingUp size={12} style={{ marginRight: '4px', display: 'inline' }} />
                  ) : (
                    <TrendingDown size={12} style={{ marginRight: '4px', display: 'inline' }} />
                  )}
                  {isPositive ? '+' : ''}{stock.change} ({isPositivePercent ? '+' : ''}{stock.changePercent}%)
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div style={{ 
        marginTop: '15px', 
        padding: '10px', 
        background: '#f8f9fa', 
        borderRadius: '6px',
        fontSize: '0.8rem',
        color: '#666',
        textAlign: 'center'
      }}>
        Data updates every 5 minutes • {type === 'crypto' ? 'Cryptocurrency' : 'Stock'} prices
      </div>
    </div>
  );
};

export default StocksWidget;
