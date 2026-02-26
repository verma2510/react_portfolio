import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import { Footer } from './components/Footer';
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
              <Route path="/about" element={<About />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/experience" element={<Experience />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
