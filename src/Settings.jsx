import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { UnitContext } from './UnitContext';
import './Settings.css';

function Settings() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { units, toggleUnits } = useContext(UnitContext);

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <div className="setting-item">
        <label>Theme</label>
        <button onClick={toggleTheme}>Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode</button>
      </div>
      <div className="setting-item">
        <label>Units</label>
        <button onClick={toggleUnits}>Switch to {units === 'metric' ? 'Fahrenheit' : 'Celsius'}</button>
      </div>
    </div>
  );
}

export default Settings;