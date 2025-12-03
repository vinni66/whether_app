import { useContext } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import WeatherCard from './WeatherCard';
import { WeatherContext } from './WeatherContext';
import LoadingSpinner from './LoadingSpinner';

function Home() {
  const { weatherData, error, loading, fetchWeatherData } = useContext(WeatherContext);

  return (
    <div className="home">
      <SearchBar onSearch={fetchWeatherData} />
      {!weatherData && !loading && !error && (
        <p className="initial-message">
          Detecting your location or search for a city to get weather.
        </p>
      )}
      {loading && <LoadingSpinner />}
      {error && <p className="error">{error}</p>}
      {weatherData && <WeatherCard data={weatherData} />}
      {weatherData && !loading && (
        <Link to="/forecast" className="view-forecast-link">View 5-Day Forecast</Link>
      )}
    </div>
  );
}

export default Home;