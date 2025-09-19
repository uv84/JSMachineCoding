import React, { useState, useEffect } from 'react';
import { ExternalLink, Clock } from 'lucide-react';

const NewsWidget = ({ category = 'general' }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock news data
        const mockNewsData = [
          {
            id: 1,
            title: `Latest ${category} news: Major breakthrough in technology sector`,
            source: 'Tech Daily',
            publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
            url: '#'
          },
          {
            id: 2,
            title: `Breaking: New developments in ${category} industry`,
            source: 'Business Insider',
            publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
            url: '#'
          },
          {
            id: 3,
            title: `Analysis: The future of ${category} and what it means for consumers`,
            source: 'Market Watch',
            publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
            url: '#'
          },
          {
            id: 4,
            title: `Expert opinion: ${category} trends to watch in 2024`,
            source: 'Financial Times',
            publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
            url: '#'
          },
          {
            id: 5,
            title: `Update: Recent changes in ${category} regulations`,
            source: 'Reuters',
            publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
            url: '#'
          }
        ];
        
        setNews(mockNewsData);
      } catch (err) {
        setError('Failed to load news');
        console.error('News fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  const loadMoreNews = async () => {
    try {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      // Mock additional news data
      const additionalNews = [
        {
          id: news.length + 1,
          title: `More ${category} updates: Industry leaders meet`,
          source: 'Industry Weekly',
          publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
          url: '#'
        },
        {
          id: news.length + 2,
          title: `Insight: ${category} market analysis and predictions`,
          source: 'Analytics Pro',
          publishedAt: new Date(Date.now() - Math.random() * 86400000).toISOString(),
          url: '#'
        }
      ];
      
      setNews(prev => [...prev, ...additionalNews]);
      setPage(prev => prev + 1);
    } catch (err) {
      console.error('Load more news error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  if (loading && news.length === 0) {
    return (
      <div className="loading">
        <Clock className="widget-icon" style={{ marginRight: '8px' }} />
        Loading news...
      </div>
    );
  }

  if (error && news.length === 0) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <div className="news-list">
        {news.map((article) => (
          <div key={article.id} className="news-item">
            <div className="news-title">
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  color: 'inherit', 
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px'
                }}
              >
                <span style={{ flex: 1 }}>{article.title}</span>
                <ExternalLink size={14} color="#667eea" />
              </a>
            </div>
            <div className="news-source">
              <Clock size={12} style={{ marginRight: '4px', display: 'inline' }} />
              {article.source} • {formatTimeAgo(article.publishedAt)}
            </div>
          </div>
        ))}
      </div>
      
      {loading && news.length > 0 && (
        <div style={{ textAlign: 'center', padding: '10px', color: '#667eea' }}>
          Loading more...
        </div>
      )}
      
      <button 
        className="load-more-btn" 
        onClick={loadMoreNews}
        disabled={loading}
        style={{ width: '100%' }}
      >
        {loading ? 'Loading...' : 'Load More News'}
      </button>
    </div>
  );
};

export default NewsWidget;
