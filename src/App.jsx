import React, { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Education from './components/Education'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import TechStack from './components/ui/demo-tech-stack'
import AllProjectsView from './components/AllProjectsView'
import AllExperienceView from './components/AllExperienceView'

function App() {
  const [path, setPath] = useState(window.location.pathname);
  const [stats, setStats] = useState({ linkedinFollowers: "12,300+", resume: null });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/stats/")
      .then((res) => res.json())
      .then((data) => {
        setStats({
          linkedinFollowers: data.linkedin_followers || "12,300+",
          resume: data.resume || null
        });
      })
      .catch((err) => console.log("Using fallback follower stats:", err));
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      setPath(window.location.pathname);
      window.scrollTo(0, 0);
    };

    window.portfolioNavigate = (to) => {
      window.history.pushState(null, '', to);
      window.dispatchEvent(new Event('popstate'));
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  if (path === '/projects') {
    return <AllProjectsView />;
  }

  if (path === '/experience') {
    return <AllExperienceView />;
  }

  return (
    <div className="bg-dark-900 min-h-screen text-white font-sans selection:bg-amber-500/30 selection:text-amber-200">
      <Navbar resumeUrl={stats.resume} />
      <main>
        <Hero linkedinFollowers={stats.linkedinFollowers} resumeUrl={stats.resume} />
        <div className="relative z-10 bg-dark-900/95 backdrop-blur-xl border-t border-white/5">
          <About />
          <TechStack />
          <Education />
          <Experience />
          <Projects />
          <Contact />
        </div>
      </main>
    </div>
  )
}

export default App
