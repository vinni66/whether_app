import { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WeatherContext } from './WeatherContext';
import ForecastCard from './ForecastCard';
import TiltCard from './TiltCard';
import LoadingSpinner from './LoadingSpinner';
import './Forecast.css';

function Forecast() {
  const { forecastData, weatherData, loading } = useContext(WeatherContext);

  if (loading) return <LoadingSpinner />;

  if (!forecastData || forecastData.length === 0) {
    return (
      <div className="forecast-container-empty">
        <h1>5-Day Forecast</h1>
        <p>Search for a city on the Home page to see the forecast.</p>
      </div>
    );
  }

  return (
    <div className="forecast-page">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        5-Day Forecast for {weatherData?.name}
      </motion.h1>

      <motion.div
        className="forecast-grid"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1
            }
          }
        }}
      >
        {forecastData.map((item, index) => (
          <TiltCard key={index} className="forecast-tilt-wrapper">
            <ForecastCard data={item} index={index} />
          </TiltCard>
        ))}
      </motion.div>
    </div>
  );
}

export default Forecast;