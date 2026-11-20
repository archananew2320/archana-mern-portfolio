import { useState } from 'react';
import { sendMessage } from '../api.js';

const empty = { name: '', email: '', message: '', website: '' };

export default function Contact({ profile }) {
  const { contact, links } = profile;
  const [form, setForm] = useState(empty);
  const [state, setState] = useState({ status: 'idle', error: '' });
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async e => {
    e.preventDefault();
    setState({ status: 'sending', error: '' });
    try {
      await sendMessage(form);
      setForm(empty);
      setState({ status: 'sent', error: '' });
    } catch (err) {
      setState({ status: 'error', error: err.message });
    }
  };

  return (
    <section id="contact" className="wrap block">
      <div className="hello-card">
        <p className="note light">{contact.eyebrow}</p>
        <h2>{contact.heading}</h2>
        <p>{contact.text}</p>

        <form className="contact-form" onSubmit={submit}>
          <label>Name<input required maxLength={100} value={form.name} onChange={set('name')} autoComplete="name" /></label>
          <label>Email<input required type="email" maxLength={200} value={form.email} onChange={set('email')} autoComplete="email" /></label>
          <label>Message<textarea required maxLength={2000} value={form.message} onChange={set('message')} /></label>
          {/* honeypot: real users never see or fill this */}
          <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" value={form.website} onChange={set('website')} />
          <button className="btn white" type="submit" disabled={state.status === 'sending'}>
            {state.status === 'sending' ? 'Sending…' : 'Send Message'}
          </button>
          <p className={`form-msg ${state.status === 'sent' ? 'ok' : 'err'}`} role="status" aria-live="polite">
            {state.status === 'sent' && 'Thanks! Your message has been sent.'}
            {state.status === 'error' && state.error}
          </p>
        </form>

        <div className="actions">
          <a className="btn outline" href={`mailto:${links.email}`}>{links.email}</a>
          <a className="btn outline" href={links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="btn outline" href={links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="btn outline" href={links.resume} download>Resume</a>
        </div>
      </div>
    </section>
  );
}
