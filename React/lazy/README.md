# Lazy Dashboard

A modern React dashboard application that demonstrates lazy loading of widgets. Widgets are only loaded when they become visible in the viewport, improving performance and user experience.

## Features

- **Lazy Loading**: Widgets load only when they become visible in the viewport
- **Multiple Widget Types**: Weather, News, and Stock Market widgets
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Beautiful glassmorphism design with smooth animations
- **Real-time Data**: Simulated real-time data updates
- **Intersection Observer**: Uses React Intersection Observer for efficient lazy loading

## Widgets Included

### 1. Weather Widget
- Displays current temperature, weather description, and detailed weather information
- Shows humidity, wind speed, visibility, and "feels like" temperature
- Supports different cities (configurable)

### 2. News Widget
- Displays latest news articles with source and publication time
- Supports different news categories (general, technology, etc.)
- "Load More" functionality for pagination
- Clickable links to read full articles

### 3. Stock Market Widget
- Shows stock prices, changes, and percentage changes
- Supports both traditional stocks and cryptocurrencies
- Color-coded positive/negative changes with trending icons
- Real-time price updates simulation

## How Lazy Loading Works

The application uses the `react-intersection-observer` library to detect when widgets enter the viewport:

1. **Initial State**: Widgets show a loading placeholder
2. **Intersection Detection**: When a widget becomes visible (10% threshold), it triggers the lazy loading
3. **Data Fetching**: The widget component fetches its data
4. **Rendering**: Once data is loaded, the widget displays its content

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd lazy-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/
│   ├── WeatherWidget.js      # Weather data widget
│   ├── NewsWidget.js         # News articles widget
│   └── StocksWidget.js       # Stock market widget
├── App.js                    # Main application component
├── index.js                  # Application entry point
└── index.css                 # Global styles
```

## Key Technologies Used

- **React 18**: Modern React with hooks
- **React Intersection Observer**: For lazy loading detection
- **Lucide React**: Beautiful icons
- **CSS Grid & Flexbox**: Responsive layout
- **Glassmorphism Design**: Modern UI with backdrop blur effects

## Customization

### Adding New Widgets

1. Create a new widget component in `src/components/`
2. Import it in `App.js`
3. Add it to the dashboard grid with the `LazyWidget` wrapper

Example:
```jsx
<LazyWidget
  id="my-widget"
  title="My Widget"
  icon={<MyIcon className="widget-icon" />}
  onVisibilityChange={handleWidgetVisibility}
  isVisible={visibleWidgets.has('my-widget')}
>
  <MyWidget />
</LazyWidget>
```

### Configuring Real APIs

To use real APIs instead of mock data:

1. **Weather API**: Replace mock data in `WeatherWidget.js` with OpenWeatherMap or similar
2. **News API**: Replace mock data in `NewsWidget.js` with NewsAPI or similar
3. **Stock API**: Replace mock data in `StocksWidget.js` with Alpha Vantage or similar

Example for weather API:
```javascript
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const response = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
);
const data = await response.json();
```

## Performance Benefits

- **Reduced Initial Load Time**: Only visible widgets are loaded initially
- **Lower Memory Usage**: Widgets not in view don't consume resources
- **Better User Experience**: Faster page loads and smoother scrolling
- **Bandwidth Optimization**: Data is fetched only when needed

## Browser Support

- Chrome 51+
- Firefox 55+
- Safari 12.1+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
