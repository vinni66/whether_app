import { useContext } from 'react';
import './WeatherCard.css';
import { UnitContext } from './UnitContext';

function WeatherCard({ data }) {
  const { units } = useContext(UnitContext);

  if (!data) {
    return null;
  }

  const { name, main, weather, wind } = data;
  const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  const tempUnitSymbol = units === 'metric' ? '°C' : '°F';

  return (
    <div className="weather-card">
      <h2>{name}</h2>
      <img src={iconUrl} alt={weather[0].description} />
      <p className="temp">{Math.round(main.temp)}{tempUnitSymbol}</p>
      <p className="description">{weather[0].description}</p>
      <div className="details">
        <p>Humidity: {main.humidity}%</p>
        <p>Wind: {wind.speed} m/s</p>
      </div>
    </div>
  );
}

export default WeatherCard;