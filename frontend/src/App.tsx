import { LazyMotion, domAnimation } from 'framer-motion';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from './components/layout/ThemeProvider';
import { Home } from './pages/Home';

function App() {
  return (
    <ThemeProvider>
      <LazyMotion features={domAnimation} strict>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            {/* Redirect any old sub-routes back to the single-page home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </LazyMotion>
    </ThemeProvider>
  );
}

export default App;
