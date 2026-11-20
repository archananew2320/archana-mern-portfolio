import { useEffect, useRef, useState } from 'react';

export default function Hero({ profile }) {
  const { name, headline, subtitle, intro, links } = profile;
  const portrait = useRef(null);
  const [photoOk, setPhotoOk] = useState(true);

  // Portrait tilts toward the cursor (desktop only)
  useEffect(() => {
    const el = portrait.current;
    if (!el || matchMedia('(prefers-reduced-motion: reduce)').matches || !matchMedia('(hover: hover)').matches) return;
    let on = false;
    const move = e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) / innerWidth;
      const y = (e.clientY - (r.top + r.height / 2)) / innerHeight;
      el.style.transform = `perspective(800px) rotateY(${x * 22}deg) rotateX(${-y * 22}deg)`;
    };
    const start = () => { if (!on) { on = true; addEventListener('mousemove', move); } };
    el.addEventListener('animationend', start, { once: true });
    return () => { el.removeEventListener('animationend', start); removeEventListener('mousemove', move); };
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-text">
        <p className="note">Hello, I'm {name}</p>
        <h1>{headline}</h1>
        <p className="titles">{subtitle}</p>
        <p className="intro">{intro}</p>
        <div className="actions">
          <a className="btn solid" href={links.resume} download>Download Resume</a>
          <a className="btn line" href="#contact">Contact Me</a>
        </div>
        <p className="social">
          <a href={links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={`mailto:${links.email}`}>Email</a>
        </p>
      </div>
      <div className="portrait" ref={portrait}>
        {photoOk
          ? <img src="/assets/profile.jpg" alt={`Portrait of ${name}`} width="720" height="720" onError={() => setPhotoOk(false)} />
          : <div className="fallback" aria-hidden="true">{name.split(' ').map(w => w[0]).join('')}</div>}
      </div>
    </section>
  );
}
