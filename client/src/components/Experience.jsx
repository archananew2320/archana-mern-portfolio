import { useEffect, useRef } from 'react';

export default function Experience({ timeline }) {
  const road = useRef(null);

  // Journey line fills as the section scrolls into view
  useEffect(() => {
    const el = road.current;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.6 - r.top) / r.height));
      el.style.setProperty('--p', p.toFixed(3));
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, [timeline]);

  return (
    <section id="experience" className="wrap block">
      <h2>Education &amp; Experience</h2>
      <ol className="road" ref={road}>
        {timeline.map(t => (
          <li key={t._id}>
            <span className="year">{t.period}</span>
            <div className="polaroid">
              <span className={`badge${t.type === 'experience' ? ' work' : ''}`}>{t.type === 'experience' ? 'Experience' : 'Education'}</span>
              <h3>{t.title}</h3>
              <p className="org">{t.organization}</p>
              {t.description && <p>{t.description}</p>}
              {t.points?.length > 0 && <ul className="points">{t.points.map(p => <li key={p}>{p}</li>)}</ul>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
