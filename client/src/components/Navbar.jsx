import { useEffect, useState } from 'react';

const LINKS = [
  ['about', 'About'], ['skills', 'Skills'], ['projects', 'Projects'],
  ['experience', 'Experience'], ['achievements', 'Certifications'], ['contact', 'Contact'],
];

export default function Navbar({ name }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const onKey = e => e.key === 'Escape' && setOpen(false);
    document.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('scroll', onScroll); document.removeEventListener('keydown', onKey); };
  }, []);

  useEffect(() => {
    const spy = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) setActive(e.target.id);
    }), { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(s => spy.observe(s));
    return () => spy.disconnect();
  }, []);

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`}>
      <a className="logo" href="#home">{name}</a>
      <button className="menu-btn" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="menu" onClick={() => setOpen(o => !o)}>
        <span /><span />
      </button>
      <nav id="menu" className={open ? 'open' : ''} aria-label="Main">
        {LINKS.map(([id, label]) => (
          <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} onClick={() => setOpen(false)}>{label}</a>
        ))}
      </nav>
    </header>
  );
}
