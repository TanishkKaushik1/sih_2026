import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Overview } from './pages/Overview';
import { Settings } from './pages/Settings';
import { NodeDetails } from './pages/NodeDetails';
import { Alerts } from './pages/Alerts'; 
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/node/:id" element={<NodeDetails />} />
        
        {/* Replace the old redirect with the actual component */}
        <Route path="/alerts" element={<Alerts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;