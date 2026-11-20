import useInView from '../hooks/useInView.js';

const Tags = ({ tags }) => <ul className="tags">{tags.map(t => <li key={t}>{t}</li>)}</ul>;

function Card({ p }) {
  const { r = 0, x = 0, y = 0 } = p.layout || {};
  const style = { '--r': `${r}deg`, '--x': `${x}px`, '--y': `${y}px` };

  if (p.featured) {
    return (
      <article className="card featured" style={style}>
        {p.badge && (
          <span className="patent">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.7 2.7L16 9.5" /></svg>
            {p.badge}
          </span>
        )}
        <p className="kicker">{p.kicker}</p>
        <h3>{p.title}</h3>
        <p className="lead">{p.lead}</p>
        <dl className="pillars">
          {p.pillars.map(x => <div key={x.term}><dt>{x.term}</dt><dd>{x.description}</dd></div>)}
        </dl>
        <Tags tags={p.tags} />
      </article>
    );
  }
  return (
    <article className="card" style={style}>
      <h3>{p.title}</h3>
      <p className="sub">{p.subtitle}</p>
      <ul className="points">{p.points.map(pt => <li key={pt}>{pt}</li>)}</ul>
      <Tags tags={p.tags} />
    </article>
  );
}

export default function Projects({ projects }) {
  const [ref, seen] = useInView({ threshold: 0.15 });
  return (
    <section id="projects" className="band">
      <div className="wrap">
        <h2>Projects</h2>
        <div className={`cards${seen ? ' in' : ''}`} ref={ref}>
          {projects.map(p => <Card key={p._id} p={p} />)}
        </div>
      </div>
    </section>
  );
}
