import { useContext } from 'react';
import './ForecastCard.css';
import { UnitContext } from './UnitContext';

function ForecastCard({ item }) {
  const { units } = useContext(UnitContext);
  const date = new Date(item.dt * 1000);
  const day = date.toLocaleDateString('en-US', { weekday: 'short' });
  const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
  const tempUnitSymbol = units === 'metric' ? '°C' : '°F';

  return (
    <div className="forecast-card">
      <h3>{day}</h3>
      <img src={iconUrl} alt={item.weather[0].description} />
      <p className="temp">{Math.round(item.main.temp)}{tempUnitSymbol}</p>
      <p className="description">{item.weather[0].description}</p>
    </div>
  );
}

export default ForecastCard;