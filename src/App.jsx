import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './Navbar.jsx'
import Home from './Home.jsx'
import Forecast from './Forecast.jsx'
import Settings from './Settings.jsx'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forecast" element={<Forecast />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </>
  )
}

export default App
