import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Home from './Home.jsx';
import Forecast from './Forecast.jsx';
import Settings from './Settings.jsx';
import WeatherParticles from './WeatherParticles.jsx';
import Layout from './Layout.jsx';

function App() {
  const location = useLocation();

  return (
    <>
      <WeatherParticles />
      <Routes location={location} key={location.pathname}>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
