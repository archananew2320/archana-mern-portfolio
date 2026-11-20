import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Single-document profile: hero text, about, links, stats.
const Profile = model('Profile', new Schema({
  name: String,
  headline: String,
  subtitle: String,
  intro: String,
  about: [String],
  roles: [{ title: String, text: String }],
  links: { linkedin: String, github: String, email: String, resume: String },
  stats: [{ label: String, value: Number, decimals: { type: Number, default: 0 } }],
  contact: { eyebrow: String, heading: String, text: String },
}, { timestamps: true }));

const Project = model('Project', new Schema({
  title: { type: String, required: true },
  subtitle: String,
  kicker: String,
  lead: String,
  featured: { type: Boolean, default: false },
  badge: String,
  points: [String],
  pillars: [{ term: String, description: String }],
  tags: [String],
  // Positioning of the scattered "cards" effect
  layout: { r: Number, x: Number, y: Number },
  order: { type: Number, default: 0 },
}, { timestamps: true }));

const SkillGroup = model('SkillGroup', new Schema({
  category: { type: String, required: true },
  items: [String],
  order: { type: Number, default: 0 },
}));

const Timeline = model('Timeline', new Schema({
  period: String,
  type: { type: String, enum: ['education', 'experience'], required: true },
  title: String,
  organization: String,
  description: String,
  points: [String],
  order: { type: Number, default: 0 },
}));

const Certification = model('Certification', new Schema({
  title: String,
  issuer: String,
  year: String,
  order: { type: Number, default: 0 },
}));

const Message = model('Message', new Schema({
  name: { type: String, required: true, trim: true, maxlength: 100 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 200 },
  message: { type: String, required: true, trim: true, maxlength: 2000 },
}, { timestamps: true }));

export { Profile, Project, SkillGroup, Timeline, Certification, Message };
