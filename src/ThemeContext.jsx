import { createContext, useState, useMemo, useContext } from 'react';
import { WeatherContext } from './WeatherContext';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  const { weatherData } = useContext(WeatherContext);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const value = useMemo(() => ({ theme, toggleTheme }), [theme]);
  // const backgroundClass = weatherData?.weather[0]?.background || 'bg-default';
  // User requested to disable time/weather based color changes
  const backgroundClass = 'bg-default';

  return (
    <ThemeContext.Provider value={value}>
      <div className={`app-container ${theme} ${backgroundClass}`}>{children}</div>
    </ThemeContext.Provider>
  );
}