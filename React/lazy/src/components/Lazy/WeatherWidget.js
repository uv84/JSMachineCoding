import React, { useState, useEffect } from 'react';
import { Thermometer, Droplets, Wind, Eye } from 'lucide-react';

const WeatherWidget = ({ city = 'New York' }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Using a free weather API (OpenWeatherMap alternative)
        // For demo purposes, we'll use mock data since API keys are required
        // In a real app, you would use: const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock weather data
        const mockWeatherData = {
          location: city,
          temperature: Math.floor(Math.random() * 30) + 10, // 10-40°C
          description: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
          humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
          windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
          visibility: Math.floor(Math.random() * 10) + 5, // 5-15 km
          feelsLike: Math.floor(Math.random() * 30) + 10,
        };
        
        setWeather(mockWeatherData);
      } catch (err) {
        setError('Failed to load weather data');
        console.error('Weather fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  if (loading) {
    return (
      <div className="loading">
        <Thermometer className="widget-icon" style={{ marginRight: '8px' }} />
        Loading weather data...
      </div>
    );
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!weather) {
    return <div className="error">No weather data available</div>;
  }

  return (
    <div>
      <div className="weather-info">
        <div className="weather-main">
          <div className="temperature">{weather.temperature}°C</div>
          <div className="weather-description">{weather.description}</div>
          <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '5px' }}>
            Feels like {weather.feelsLike}°C
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#333' }}>
            {weather.location}
          </div>
        </div>
      </div>
      
      <div className="weather-details">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Droplets size={16} color="#667eea" />
          <span>Humidity: {weather.humidity}%</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Wind size={16} color="#667eea" />
          <span>Wind: {weather.windSpeed} km/h</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Eye size={16} color="#667eea" />
          <span>Visibility: {weather.visibility} km</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Thermometer size={16} color="#667eea" />
          <span>Feels like: {weather.feelsLike}°C</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
