import { useContext } from 'react';
import './ForecastCard.css';
import { UnitContext } from './UnitContext';
import AnimatedWeatherIcon from './AnimatedWeatherIcon';

function ForecastCard({ data }) {
  const { units } = useContext(UnitContext);

  if (!data) return null;

  const date = new Date(data.dt * 1000);
  const day = date.toLocaleDateString('en-US', { weekday: 'short' });
  const tempUnitSymbol = units === 'metric' ? '°C' : '°F';

  // Usage of weather[0].icon is fallback, prefer AnimatedWeatherIcon with code
  const code = data.code !== undefined ? data.code : 0;
  // Forecast is always generous with "day" icons, or we could calculate based on time, 
  // but daily forecast doesn't really have "night". Assume day.
  const isDay = true;

  return (
    <div className="forecast-card glass-panel">
      <h3>{day}</h3>
      <div className="icon-wrapper-forecast">
        <AnimatedWeatherIcon code={code} isDay={isDay} size={64} />
      </div>
      <p className="temp">{Math.round(data.main.temp)}{tempUnitSymbol}</p>
      <p className="description">{data.weather[0].description}</p>
    </div>
  );
}

export default ForecastCard;