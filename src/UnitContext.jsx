import { createContext, useState, useMemo } from 'react';

export const UnitContext = createContext();

export function UnitProvider({ children }) {
  const [units, setUnits] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit

  const toggleUnits = () => {
    setUnits((prevUnits) => (prevUnits === 'metric' ? 'imperial' : 'metric'));
  };

  const value = useMemo(() => ({ units, toggleUnits }), [units]);

  return (
    <UnitContext.Provider value={value}>
      {children}
    </UnitContext.Provider>
  );
}