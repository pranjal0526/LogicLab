# LogicLab — Interactive Logic Gate Simulator

LogicLab is a full-stack educational app for digital logic design. It includes a live logic-gate simulator, generated truth tables, a Boolean expression lab, and half/full adder circuits.

## Stack

- Frontend: React, Vite, Tailwind CSS
- API: Node.js, Express
- Database: MongoDB
- Hosting: Vercel (React static assets and Express API on one domain)

## MongoDB connection

The MongoDB connection is managed in `backend/services/database.js`. The app reads the connection string from `MONGODB_URI`; it is never stored in source code.

For local development, copy `backend/.env.example` to `backend/.env` and replace the placeholder URI with the MongoDB Atlas connection string (or your local MongoDB URI). Keep the `.env` file private. `MONGODB_DB_NAME` is optional and defaults to `logiclab`.

For Vercel, open **Project Settings → Environment Variables** and add:

| Name | Value |
| --- | --- |
| `MONGODB_URI` | Your MongoDB connection string |
| `MONGODB_DB_NAME` | `logiclab` (optional) |

In MongoDB Atlas, create a database user and allow the deployed Vercel function to reach the cluster through the Atlas Network Access settings. The API creates and seeds the `gates` collection from `backend/services/logic.js` when it is first used.

## Run locally

From the `logiclab` project directory:

```bash
npm install
```

Create `backend/.env` from `backend/.env.example`, then run the API and frontend in separate terminals:

```bash
npm run dev:backend
```

```bash
npm run dev:frontend
```

The API runs at `http://localhost:5001`; Vite prints the frontend URL, usually `http://localhost:5173`.

## Deploy to Vercel

1. Import the LogicLab Git repository. Set **Root Directory** to `./` and **Application Preset** to **Services**. The root `vercel.json` defines the frontend and backend services and routes `/api/*` to Express; all other paths go to the React app.
2. Add `MONGODB_URI` in Vercel **Environment Variables**. Add `MONGODB_DB_NAME=logiclab` if you want to set the default explicitly.
3. Deploy. The frontend and backend share one Vercel domain, and the frontend uses `/api` in production, so no separate API URL setting is needed.

The backend Express app is exported from `backend/index.js` for Vercel. `backend/server.js` starts the same app for local development, and the root `server.js` remains a compatibility entry point.

## API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/health` | API health check |
| GET | `/api/gates` | List gate details |
| GET | `/api/gates/:id` | Get a gate and its generated truth table |

## Project structure

```text
logiclab/
├── backend/
│   ├── routes/gates.js        # Gate API routes
│   ├── index.js               # Express app exported to Vercel
│   ├── services/database.js  # MongoDB connection and seed logic
│   ├── services/logic.js     # Gate, truth-table, and adder rules
│   └── server.js             # Local API entry point
├── frontend/
│   └── src/                  # React app, pages, and components
├── server.js                # Root compatibility entry point
└── vercel.json              # Vercel Services and shared routing
```
