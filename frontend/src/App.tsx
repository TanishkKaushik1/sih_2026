import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Overview } from './pages/Overview';
import { Settings } from './pages/Settings';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/settings" element={<Settings />} />
        {/* Placeholder for Alerts page */}
        <Route path="/alerts" element={<Navigate to="/" replace />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;