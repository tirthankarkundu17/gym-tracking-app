import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import VideoGridPage from './pages/VideoGridPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/category/:id" element={<VideoGridPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
