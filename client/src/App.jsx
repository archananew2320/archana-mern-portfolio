import { useEffect, useState } from 'react';
import { fetchPortfolio } from './api.js';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Experience from './components/Experience.jsx';
import Achievements from './components/Achievements.jsx';
import Contact from './components/Contact.jsx';

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPortfolio().then(setData).catch(e => setError(e.message));
  }, []);

  if (error) return <div className="status"><div><h2>Couldn't load the portfolio</h2><p>{error}</p><p>Make sure the server is running and the database is seeded.</p></div></div>;
  if (!data) return <div className="status" role="status">Loading…</div>;

  const { profile, projects, skills, timeline, certifications } = data;
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Navbar name={profile.name} />
      <main id="main">
        <Hero profile={profile} />
        <About profile={profile} />
        <Skills skills={skills} />
        <Projects projects={projects} />
        <Experience timeline={timeline} />
        <Achievements stats={profile.stats} certifications={certifications} />
        <Contact profile={profile} />
      </main>
      <footer><p>&copy; {new Date().getFullYear()} {profile.name}</p></footer>
    </>
  );
}
