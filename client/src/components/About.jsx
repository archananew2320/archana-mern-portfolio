import { useState } from 'react';

export default function About({ profile }) {
  const { about, roles } = profile;
  // order[0] is the card on top; clicking cycles the stack
  const [order, setOrder] = useState(() => roles.map((_, i) => i));
  const cycle = () => setOrder(o => [...o.slice(1), o[0]]);

  return (
    <section id="about" className="band">
      <div className="wrap two">
        <div>
          <h2>About Me</h2>
          {about.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <div className="stack">
          {roles.map((r, idx) => (
            <button key={r.title} className="role" type="button" data-pos={order.indexOf(idx)} onClick={cycle}>
              <span>{r.title}</span><small>{r.text}</small>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
