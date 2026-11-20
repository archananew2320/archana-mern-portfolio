import 'dotenv/config';
import mongoose from 'mongoose';
import connectDB from '../config/db.js';
import { Profile, Project, SkillGroup, Timeline, Certification } from '../models/index.js';

const profile = {
  name: 'Archana V',
  headline: 'Data Analytics & Java Developer',
  subtitle: 'Technical Training',
  intro: 'As a Computer Science undergraduate and Technical Trainer, I combine analytical thinking, software engineering, and clear communication. I specialize in turning raw data into business insights using SQL and Power BI, building scalable backends with Java and Spring Boot, and mentoring learners in core technical concepts. I thrive in collaborative environments and am excited to contribute as a Data Analyst or Java Developer.',
  about: [
    'I am a final-year B.E. Computer Science and Engineering student at Periyar Institute of Technology, graduating in 2027 with a CGPA of 8.67.',
    'My strengths are data cleaning, analysis and dashboard development with Python, SQL and Power BI. During my internship at GP Tech Corp, I prepared datasets and built interactive dashboards. I also built ROIMS, a full incident-management platform with Java, Spring Boot and MySQL.',
    'I am seeking a fresher role as a Data Analyst, Technical Trainee or Junior Software Developer, where I can turn data into decisions and contribute to dependable software.',
  ],
  roles: [
    { title: 'Data Analytics', text: 'Data cleaning, SQL, Pandas and interactive Power BI dashboards' },
    { title: 'Backend Development', text: 'Java, Spring Boot, REST APIs and MySQL databases' },
    { title: 'Continuous Learning', text: 'Python AI Agent Development, Udemy (2025)' },
  ],
  links: {
    linkedin: 'https://www.linkedin.com/in/archana-v-244442316/',
    github: 'https://github.com/archananew2320',
    email: 'archananew2320@gmail.com',
    resume: '/assets/Archana_V_Resume.pdf',
  },
  stats: [
    { label: 'CGPA', value: 8.67, decimals: 2 },
    { label: 'Key Projects', value: 4 },
    { label: 'Internship', value: 1 },
    { label: 'Certifications', value: 2 },
  ],
  contact: {
    eyebrow: "Let's connect",
    heading: 'Looking for a motivated fresher?',
    text: 'I would be glad to discuss opportunities in data analytics and software development. Send a message below or email me directly.',
  },
};

const projects = [
  {
    title: 'Gyroscope-Based Vehicle Collision Detection and Emergency Notification System',
    kicker: 'Featured Project', featured: true, badge: 'Patent Published',
    lead: 'Developed a hardware/software integrated concept using a gyroscope sensor, GPS, and GSM for collision detection and emergency notifications.',
    pillars: [
      { term: 'Innovation', description: 'A hardware and software integrated concept for collision detection and emergency notifications.' },
      { term: 'Technical implementation', description: 'Gyroscope sensor, GPS and GSM.' },
      { term: 'Research contribution', description: 'Patent published.' },
    ],
    tags: ['Gyroscope Sensor', 'GPS', 'GSM', 'Hardware and Software Integration'],
    layout: { r: 0, x: 0, y: 50 },
  },
  {
    title: 'ROIMS: Incident Management Platform',
    subtitle: 'Real-Time Operational Problem Detection and Impact Prediction',
    points: [
      'Built a web platform to record, track, update and manage operational incidents.',
      'Developed Spring Boot REST APIs with CRUD operations, backed by a MySQL database for users, teams, incidents and impact data.',
      'Added impact prediction from incident severity, showing predicted business risk and recommended priority.',
      'Created dashboards with status summaries, search, filters, analytics, reports and CSV export.',
    ],
    tags: ['Java', 'Spring Boot', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    layout: { r: -3, x: -30, y: 40 },
  },
  {
    title: 'Airline Delay and Cancellation Analysis',
    subtitle: 'Data analysis and dashboards',
    points: [
      'Cleaned and processed airline datasets with Python and Pandas.',
      'Removed missing values and duplicate records to improve data quality.',
      'Analysed delay and cancellation trends and built interactive Power BI dashboards.',
    ],
    tags: ['Python', 'Pandas', 'SQL', 'Power BI'],
    layout: { r: 3, x: 30, y: 60 },
  },
  {
    title: 'E-Commerce Return and Refund Analytics',
    subtitle: 'Exploratory analysis and business insights',
    points: [
      'Performed data cleaning and exploratory analysis on e-commerce datasets.',
      'Identified return patterns and refund trends affecting business performance.',
      'Presented findings through Power BI dashboards.',
    ],
    tags: ['Python', 'SQL', 'Power BI'],
    layout: { r: -3, x: -20, y: 50 },
  },
  {
    title: 'Student Management System',
    subtitle: 'Full-stack web application',
    points: [
      'Built a MERN stack application to register students and view their details.',
      'Added a confirmation popup after each successful registration.',
    ],
    tags: ['MongoDB', 'Express', 'React', 'Node.js'],
    layout: { r: 3, x: 20, y: 70 },
  },
].map((p, i) => ({ ...p, order: i }));

const skills = [
  ['Programming', ['Java', 'Python', 'SQL', 'JavaScript']],
  ['Data & Reporting', ['Power BI', 'Excel', 'Pandas', 'NumPy', 'Data Cleaning', 'Data Visualization']],
  ['Backend & Databases', ['Spring Boot', 'REST APIs', 'CRUD Operations', 'MySQL', 'MongoDB']],
  ['Web', ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express']],
  ['Business Analysis', ['BRD', 'FRD', 'User Stories', 'Process Mapping', 'Jira (Basic)']],
  ['Core Strengths', ['OOP', 'Problem Solving', 'Analytical Thinking', 'Teamwork', 'Communication']],
].map(([category, items], order) => ({ category, items, order }));

const timeline = [
  { period: '2023', type: 'education', title: 'Higher Secondary Education', organization: 'GGHS School, Vadalur (State Board)', description: 'Completed in 2023 with 68.8%.' },
  { period: '2023 – 2027', type: 'education', title: 'B.E. Computer Science and Engineering (CSE)', organization: 'Periyar Institute of Technology', description: 'CGPA: 8.67. Expected graduation in 2027.' },
  {
    period: '2024 – 2025', type: 'experience', title: 'Data Analytics Intern', organization: 'GP Tech Corp, Tambaram',
    points: ['Cleaned and preprocessed datasets using Python.', 'Analysed data to identify patterns and trends.', 'Created interactive Power BI dashboards.'],
  },
].map((t, i) => ({ ...t, order: i }));

const certifications = [
  { title: 'Python AI Agent Development', issuer: 'Udemy', year: '2025' },
  { title: 'Internship Completion Certification in Data Analytics', issuer: 'GP Tech Corp', year: '2025' },
].map((c, i) => ({ ...c, order: i }));

await connectDB();
await Promise.all([Profile, Project, SkillGroup, Timeline, Certification].map(m => m.deleteMany({})));
await Profile.create(profile);
await Project.insertMany(projects);
await SkillGroup.insertMany(skills);
await Timeline.insertMany(timeline);
await Certification.insertMany(certifications);
console.log('Database seeded.');
await mongoose.disconnect();
