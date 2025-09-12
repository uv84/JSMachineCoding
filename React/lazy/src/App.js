import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import WeatherWidget from './components/WeatherWidget';
import NewsWidget from './components/NewsWidget';
import StocksWidget from './components/StocksWidget';
import { Cloud, Newspaper, TrendingUp } from 'lucide-react';

const App = () => {
  const [visibleWidgets, setVisibleWidgets] = useState(new Set());

  const handleWidgetVisibility = (widgetId, isVisible) => {
    setVisibleWidgets(prev => {
      const newSet = new Set(prev);
      if (isVisible) {
        newSet.add(widgetId);
      }
      return newSet;
    });
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Lazy Dashboard</h1>
        <p>Widgets load only when they become visible in the viewport</p>
      </div>
      
      <div className="dashboard">
        <LazyWidget
          id="weather"
          title="Weather"
          icon={<Cloud className="widget-icon" />}
          onVisibilityChange={handleWidgetVisibility}
          isVisible={visibleWidgets.has('weather')}
        >
          <WeatherWidget />
        </LazyWidget>

        <LazyWidget
          id="news"
          title="Latest News"
          icon={<Newspaper className="widget-icon" />}
          onVisibilityChange={handleWidgetVisibility}
          isVisible={visibleWidgets.has('news')}
        >
          <NewsWidget />
        </LazyWidget>

        <LazyWidget
          id="stocks"
          title="Stock Market"
          icon={<TrendingUp className="widget-icon" />}
          onVisibilityChange={handleWidgetVisibility}
          isVisible={visibleWidgets.has('stocks')}
        >
          <StocksWidget />
        </LazyWidget>

        {/* Additional widgets to demonstrate lazy loading */}
        <LazyWidget
          id="weather2"
          title="Weather (Secondary)"
          icon={<Cloud className="widget-icon" />}
          onVisibilityChange={handleWidgetVisibility}
          isVisible={visibleWidgets.has('weather2')}
        >
          <WeatherWidget city="London" />
        </LazyWidget>

        <LazyWidget
          id="news2"
          title="Tech News"
          icon={<Newspaper className="widget-icon" />}
          onVisibilityChange={handleWidgetVisibility}
          isVisible={visibleWidgets.has('news2')}
        >
          <NewsWidget category="technology" />
        </LazyWidget>

        <LazyWidget
          id="stocks2"
          title="Crypto Market"
          icon={<TrendingUp className="widget-icon" />}
          onVisibilityChange={handleWidgetVisibility}
          isVisible={visibleWidgets.has('stocks2')}
        >
          <StocksWidget type="crypto" />
        </LazyWidget>
      </div>
    </div>
  );
};

// LazyWidget component that handles intersection observer
const LazyWidget = ({ id, title, icon, children, onVisibilityChange, isVisible }) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  React.useEffect(() => {
    if (inView) {
      onVisibilityChange(id, true);
    }
  }, [inView, id, onVisibilityChange]);

  return (
    <div ref={ref} className="widget">
      <div className="widget-header">
        <div className="widget-title">
          {icon}
          {title}
        </div>
      </div>
      
      {inView && isVisible ? (
        children
      ) : (
        <div className="loading">
          Scroll to load {title.toLowerCase()}...
        </div>
      )}
    </div>
  );
};

export default App;
