# Archana V – MERN Portfolio

Your original static portfolio, rebuilt as a MERN app with the same design.

```
mern-portfolio/
├── client/   React (Vite) front end
└── server/   Express + MongoDB (Mongoose) API
```

Portfolio content (profile, projects, skills, timeline, certifications) lives in MongoDB and is
served by the API. The contact form saves messages to a `messages` collection.

## Run locally
Requires Node 18+ and MongoDB (local, or a free Atlas cluster).

```bash
npm install                  # root helper (concurrently)
npm run install:all          # installs server + client deps
cp server/.env.example server/.env    # set MONGO_URI
npm run seed                 # loads your content into MongoDB
npm run dev                  # API on :5000, client on :5173
```
Open http://localhost:5173.

## API
| Method | Route | Purpose |
|---|---|---|
| GET | `/api/portfolio` | Everything the page needs |
| GET | `/api/projects`, `/api/projects/:id` | Projects |
| POST | `/api/contact` | Save a contact message (rate-limited) |
| GET | `/api/health` | Health check |

## Editing content
Edit `server/seed/seed.js` and run `npm run seed` (it replaces the portfolio collections; messages are kept).

## Deploy
- **Server** (Render/Railway): root `server`, start `npm start`, env `MONGO_URI`, `CLIENT_ORIGIN=https://your-client-domain`.
- **Client** (Netlify/Vercel): root `client`, build `npm run build`, output `dist`, env `VITE_API_URL=https://your-api-domain`.
