import { useEffect, useRef, useState } from 'react';
import useInView from '../hooks/useInView.js';

function CountUp({ to, decimals = 0 }) {
  const [ref, seen] = useInView({ threshold: 0.6 });
  const [val, setVal] = useState(0);
  const raf = useRef();

  useEffect(() => {
    if (!seen) return;
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t0 = performance.now();
    const step = t => {
      const k = reduce ? 1 : Math.min(1, (t - t0) / 1200);
      setVal(to * (1 - Math.pow(1 - k, 3)));
      if (k < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [seen, to]);

  return <strong ref={ref}>{val.toFixed(decimals)}</strong>;
}

export default function Achievements({ stats, certifications }) {
  return (
    <section id="achievements" className="band">
      <div className="wrap">
        <h2>Certifications &amp; Highlights</h2>
        <ul className="stats">
          {stats.map(s => <li key={s.label}><CountUp to={s.value} decimals={s.decimals} /><span>{s.label}</span></li>)}
        </ul>
        <ul className="certs">
          {certifications.map(c => <li key={c._id}>{c.title}<small>{c.issuer}, {c.year}</small></li>)}
        </ul>
      </div>
    </section>
  );
}
