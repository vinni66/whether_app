import { createContext, useState, useMemo, useContext, useEffect, useCallback } from 'react';
import { UnitContext } from './UnitContext';
import { getWeatherInfo } from './weatherUtils';

export const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const { units } = useContext(UnitContext);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // Stores the last successfully fetched location's details for re-fetching (e.g., on unit change)
  const [lastFetchedLocation, setLastFetchedLocation] = useState(null); // { name, latitude, longitude }

  // This is the core function to fetch weather data given coordinates and a display name
  const _fetchWeatherByCoords = useCallback(async (latitude, longitude, displayName) => {
    setLoading(true);
    setError(null);

    try {
      const tempUnit = units === 'metric' ? 'celsius' : 'fahrenheit';
      const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=${tempUnit}&timezone=auto`);
      if (!weatherResponse.ok) throw new Error("Failed to fetch weather data.");
      const data = await weatherResponse.json();

      const currentInfo = getWeatherInfo(data.current.weather_code);

      setWeatherData({
        name: displayName,
        main: {
          temp: data.current.temperature_2m,
          humidity: data.current.relative_humidity_2m,
        },
        wind: {
          speed: data.current.wind_speed_10m,
        },
        weather: [currentInfo]
      });

      const dailyForecasts = data.daily.time.map((t, i) => ({
        dt: new Date(t).getTime() / 1000,
        main: { temp: data.daily.temperature_2m_max[i] },
        weather: [getWeatherInfo(data.daily.weather_code[i])]
      })).slice(1, 6);

      setForecastData(dailyForecasts);
      setLastFetchedLocation({ name: displayName, latitude, longitude }); // Store for unit changes

    } catch (err) {
      setError(err.message);
      setWeatherData(null); // Clear previous data on error
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  }, [units]); // Recreate if units change

  // This function handles fetching weather by city name (geocoding) or by direct coordinates
  const fetchWeatherData = useCallback(async (input) => {
    setLoading(true);
    setError(null);

    if (typeof input === 'string') { // Input is a city name
      try {
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${input}&count=1&language=en&format=json`);
        if (!geoResponse.ok) throw new Error("Failed to fetch geocoding data.");
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
          throw new Error("City not found. Please try again.");
        }

        const { latitude, longitude, name } = geoData.results[0];
        await _fetchWeatherByCoords(latitude, longitude, name);

      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    } else if (input && typeof input === 'object' && input.latitude && input.longitude) { // Input is a coordinate object
      await _fetchWeatherByCoords(input.latitude, input.longitude, input.name);
    } else {
      setError("Invalid input for fetching weather.");
      setLoading(false);
    }
  }, [_fetchWeatherByCoords]);

  // Effect to refetch data when units change, if a location has been fetched
  useEffect(() => {
    if (lastFetchedLocation) {
      fetchWeatherData(lastFetchedLocation);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [units]);

  // Effect to fetch weather for user's live location on initial load
  useEffect(() => {
    let isMounted = true;

    // Only run on initial mount if no weather data is present
    if (weatherData || !navigator.geolocation) {
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        if (!isMounted) return;
        const { latitude, longitude } = position.coords;
        let displayName = 'Your Location';

        try {
          const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/reverse?latitude=${latitude}&longitude=${longitude}&count=1&format=json`);
          const geoData = await geoResponse.json();
          // The reverse geocoding API can return the name in a few places
          displayName = geoData.name || (geoData.results && geoData.results[0].name) || 'Your Location';
        } catch (error) {
          console.warn("Reverse geocoding failed, using default name.", error);
        }
        fetchWeatherData({ latitude, longitude, name: displayName });
      },
      (geoError) => {
        if (!isMounted) return;
        console.error("Geolocation error:", geoError);
        setError("Location access denied. Please search for a city manually.");
        setLoading(false);
      }
    );

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs only once on mount

  const value = useMemo(() => ({ weatherData, forecastData, error, loading, fetchWeatherData }), [weatherData, forecastData, error, loading, fetchWeatherData]);

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
}

export const useWeather = () => useContext(WeatherContext);