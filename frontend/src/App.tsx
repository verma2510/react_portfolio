import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Education } from './components/Education';
import { Certifications } from './components/Certifications';
import { Hobbies } from './components/Hobbies';
import { Contact } from './components/Contact';
import { ProgressIndicator } from './components/ProgressIndicator';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen text-slate-900 bg-slate-50 dark:bg-slate-950 dark:text-slate-100 selection:bg-indigo-500/30">
          <CustomCursor />
          <Navbar />
          <ProgressIndicator />

          <main className="pt-20">
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <About />
                  <Skills />
                  <Experience />
                  <Projects />
                  <Education />
                  <Certifications />
                  <Hobbies />
                  <Contact />
                </>
              } />
              {/* Redirect any old sub-routes back to the single-page home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
