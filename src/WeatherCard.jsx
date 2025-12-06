import { useContext } from 'react';
import './WeatherCard.css';
import { UnitContext } from './UnitContext';
import AnimatedWeatherIcon from './AnimatedWeatherIcon';

function WeatherCard({ data }) {
  const { units } = useContext(UnitContext);

  if (!data) {
    return null;
  }

  const { name, main, weather, is_day, code } = data;
  const tempUnitSymbol = units === 'metric' ? '°C' : '°F';

  const weatherCode = code !== undefined ? code : 0;
  // Use is_day from data (0 or 1), default to true (1) if undefined
  const isDay = is_day !== undefined ? !!is_day : true;

  return (
    <div className="weather-card glass-panel">
      <div className="weather-card-header">
        <h2 className="city-name">{name}</h2>
        <span className="current-date">{new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}</span>
      </div>

      <div className="weather-main-content">
        <div className="icon-container-main">
          <AnimatedWeatherIcon code={weatherCode} isDay={isDay} size={140} />
        </div>
        <div className="temp-container">
          <p className="temp">{Math.round(main.temp)}{tempUnitSymbol}</p>
          <p className="description">{weather[0].description}</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;