export default function Skills({ skills }) {
  return (
    <section id="skills" className="wrap block">
      <h2>Technical Skills</h2>
      <div className="skill-grid">
        {skills.map(g => (
          <div className="skill" key={g._id}>
            <h3>{g.category}</h3>
            <ul>{g.items.map(i => <li key={i}>{i}</li>)}</ul>
          </div>
        ))}
      </div>
    </section>
  );
}
