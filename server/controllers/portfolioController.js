import { Profile, Project, SkillGroup, Timeline, Certification, Message } from '../models/index.js';

const byOrder = { order: 1, createdAt: 1 };

// GET /api/portfolio  -> everything the page needs in one request
export async function getPortfolio(req, res, next) {
  try {
    const [profile, projects, skills, timeline, certifications] = await Promise.all([
      Profile.findOne().lean(),
      Project.find().sort(byOrder).lean(),
      SkillGroup.find().sort(byOrder).lean(),
      Timeline.find().sort(byOrder).lean(),
      Certification.find().sort(byOrder).lean(),
    ]);
    if (!profile) return res.status(404).json({ error: 'No data found. Run "npm run seed" in /server.' });
    res.json({ profile, projects, skills, timeline, certifications });
  } catch (err) { next(err); }
}

export async function getProjects(req, res, next) {
  try { res.json(await Project.find().sort(byOrder).lean()); } catch (err) { next(err); }
}

export async function getProject(req, res, next) {
  try {
    const project = await Project.findById(req.params.id).lean();
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (err) { next(err); }
}

// POST /api/contact
export async function createMessage(req, res, next) {
  try {
    const { name, email, message, website } = req.body || {};
    if (website) return res.status(201).json({ ok: true }); // honeypot: silently drop bots
    if (![name, email, message].every(v => typeof v === 'string' && v.trim())) {
      return res.status(400).json({ error: 'Name, email and message are required.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }
    await Message.create({ name, email, message });
    res.status(201).json({ ok: true });
  } catch (err) { next(err); }
}
