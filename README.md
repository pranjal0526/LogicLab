# LogicLab — Interactive Logic Gate Simulator

> **Academic Project — B.Tech 2nd Year DSTL**

LogicLab is a compact full-stack educational web app for Digital System & Logic Design.

## Features

- Live simulator for AND, OR, NOT, NAND, NOR, XOR, XNOR, and BUFFER
- Original SVG gate diagrams, binary input switches, output LED, and active truth-table row
- Dynamically generated truth tables — no duplicate hardcoded tables
- Boolean Expression Lab with five common predefined expressions
- Interactive Half Adder and Full Adder circuits
- Responsive dark engineering-themed interface
- Gate information delivered through an Express REST API and stored in SQLite

## Technology stack

| Layer | Technology |
| --- | --- |
| Frontend | React, Vite, JavaScript, Tailwind CSS, Lucide React |
| Backend | Node.js, Express.js |
| Database | SQLite using `better-sqlite3` |
| Communication | REST API using Fetch |

## Architecture

```text
React Frontend
     ↓ REST API (fetch)
Express Backend
     ↓
SQLite Database
```

## Project structure

```text
logiclab/
├── frontend/
│   ├── src/
│   │   ├── components/       # Reusable simulator, table, layout controls
│   │   ├── pages/            # Home, Simulator, Boolean Lab, Circuits, About
│   │   ├── services/api.js   # REST API client
│   │   ├── utils/logic.js    # Boolean and adder logic
│   │   ├── App.jsx
│   │   └── styles.css
│   └── package.json
├── backend/
│   ├── routes/gates.js       # Gate REST endpoints
│   ├── services/database.js  # SQLite schema and gate seeding
│   ├── services/logic.js     # Gate, table, and adder rules
│   ├── server.js
│   └── package.json
└── README.md
```

## Installation and run commands

### Prerequisites

- Node.js 20+
- npm

### Install dependencies

Open two terminals from the `logiclab` directory.

```bash
cd backend
npm install

cd ../frontend
npm install
```

### Run the backend

```bash
cd backend
npm run dev
```

The API starts at `http://localhost:5001`. On first start it creates `backend/data/logiclab.db` and seeds the eight core gate records.

### Run the frontend

```bash
cd frontend
npm run dev
```

Open the address printed by Vite, usually `http://localhost:5173`.

### Production frontend build

```bash
cd frontend
npm run build
```

## REST API

| Method | Endpoint | Purpose |
| --- | --- | --- |
| GET | `/api/health` | Server health check |
| GET | `/api/gates` | List gate details |
| GET | `/api/gates/:id` | Get one gate and its generated truth table |

## Database structure

`gates` contains `id`, `name`, `description`, `boolean_expression`, `type`, and `application`. The database is seeded from the central gate data in `backend/services/logic.js`.
