import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import Navbar from './Navbar.jsx';
import Home from './Home.jsx';
import Forecast from './Forecast.jsx';
import Settings from './Settings.jsx';
import Footer from './Footer.jsx';

function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/forecast" element={<Forecast />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}

export default App;
