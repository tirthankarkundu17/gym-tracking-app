import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import VideoGridPage from './pages/VideoGridPage';
import WatchPage from './pages/WatchPage';
import ScrollToTop from './components/ScrollToTop';
import ThemeToggle from './components/ThemeToggle';
import './App.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ThemeToggle />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/category/:id" element={<VideoGridPage />} />
          <Route path="/watch/:videoId" element={<WatchPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
