import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { UnitContext } from './UnitContext';
import ToggleSwitch from './ToggleSwitch';
import './Settings.css';

function Settings() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { units, toggleUnits } = useContext(UnitContext);

  return (
    <div className="settings-page">
      <h1>Settings</h1>

      <div className="settings-group glass-panel">
        <div className="setting-item">
          <div className="setting-info">
            <h3>Theme</h3>
            <p>Switch between light and dark appearance</p>
          </div>
          <ToggleSwitch
            isOn={theme === 'dark'}
            onToggle={toggleTheme}
            label={theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
          />
        </div>

        <div className="setting-item">
          <div className="setting-info">
            <h3>Units</h3>
            <p>Choose your preferred temperature unit</p>
          </div>
          <ToggleSwitch
            isOn={units === 'imperial'}
            onToggle={toggleUnits}
            label={units === 'imperial' ? 'Fahrenheit (°F)' : 'Celsius (°C)'}
          />
        </div>
      </div>
    </div>
  );
}

export default Settings;