import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2 } from 'lucide-react';
import { WeatherContext } from './WeatherContext';
import WeatherCard from './WeatherCard';
import HourlyForecast from './HourlyForecast';
import './Home.css';

function Home() {
  const { weatherData, error, loading, fetchWeatherData } = useContext(WeatherContext);
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchWeatherData(query);
    }
  };

  return (
    <motion.div
      className="home-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="search-section">
        <form onSubmit={handleSearch} className="search-bar glass-panel">
          <Search className="search-icon" size={20} />
          <input
            type="text"
            placeholder="Search city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" disabled={loading} className="search-button">
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Go'}
          </button>
        </form>
      </div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="error-message"
          >
            {error}
          </motion.div>
        )}

        {!weatherData && !loading && !error && (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="empty-state"
          >
            <p>Enter a city to explore the weather.</p>
          </motion.div>
        )}

        {weatherData && (
          <motion.div
            key="weather"
            className="weather-content-wrapper"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <WeatherCard data={weatherData} />

            {/* Hourly Forecast Component */}
            {weatherData.hourly && <HourlyForecast hourlyData={weatherData.hourly} />}

            <div className="forecast-link-container">
              <Link to="/forecast" className="view-forecast-btn glass-panel">
                View 5-Day Forecast
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Home;