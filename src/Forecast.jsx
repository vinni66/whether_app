import { useContext } from 'react';
import { WeatherContext } from './WeatherContext';
import ForecastCard from './ForecastCard';
import './Forecast.css'; // We'll need to create this CSS file
import LoadingSpinner from './LoadingSpinner';

function Forecast() {
  const { forecastData, weatherData, loading } = useContext(WeatherContext);

  if (loading) return <LoadingSpinner />;

  if (!forecastData || forecastData.length === 0) {
    return (
      <div>
        <h1>5-Day Forecast</h1>
        <p>Search for a city on the Home page to see the forecast.</p>
      </div>
    );
  }

  return (
    <div className="forecast-page">
      <h1>5-Day Forecast for {weatherData?.name}</h1>
      <div className="forecast-container">{forecastData.map((item, index) => <ForecastCard key={index} item={item} />)}</div>
    </div>
  );
}

export default Forecast;