# LogicLab — Interactive Logic Gate Simulator

> **Academic Project — B.Tech 2nd Year DSTL**

LogicLab is a compact full-stack educational web app for Digital System & Logic Design. Students can toggle binary inputs, observe a live gate output, inspect a generated truth table, evaluate selected Boolean expressions, and experiment with half and full adders.

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

## How the simulator works

1. React stores input values `A` and `B` as `0` or `1` in component state.
2. `calculateGateOutput(gate, inputs)` calculates the selected Boolean operation immediately.
3. `generateTruthTable(gate)` creates all valid binary combinations at runtime.
4. The rendered table compares every row with the live inputs and highlights the matching row.
5. The frontend requests gate information from the Express API, which reads seeded records from SQLite.

## Important files for a viva

- `frontend/src/utils/logic.js` — reusable gate, truth-table, expression, and adder functions
- `frontend/src/pages/SimulatorPage.jsx` — React state, switches, output, and gate API request
- `frontend/src/components/GateVisualizer.jsx` — original SVG gate visualisation
- `frontend/src/services/api.js` — frontend REST client
- `backend/services/logic.js` — backend gate/table/adder functions
- `backend/services/database.js` — SQLite schema creation and gate seed logic
- `backend/routes/gates.js` — REST gate routes
- `backend/server.js` — Express server configuration

## Likely viva questions and concise answers

1. **Why use React?** React updates the output automatically when component state changes.
2. **What is a logic gate?** An electronic building block that performs a Boolean operation on binary inputs.
3. **Why is NAND universal?** Any Boolean function can be implemented using only NAND gates.
4. **How is XOR different from OR?** OR is HIGH when one or both inputs are HIGH; XOR is HIGH only when inputs differ.
5. **What is a truth table?** A list of every possible input combination and its output.
6. **How are tables generated here?** A reusable function creates binary combinations and applies the selected gate rule.
7. **Why use 0 and 1?** They represent LOW and HIGH digital signal levels.
8. **What are half-adder equations?** `SUM = A XOR B`, `CARRY = A AND B`.
9. **What does a full adder add?** A, B, and carry-in (`Cin`).
10. **What is REST communication here?** React sends HTTP requests to Express to obtain gate information.
11. **What is SQLite?** A lightweight relational database stored in a single file.
12. **What does the API return for one gate?** Gate information plus a generated truth table.
13. **What is React state in the simulator?** The current binary input values and selected gate.
14. **Why are expressions predefined in Boolean Lab?** It keeps the project understandable without building a complex parser.
15. **What could be added later?** A drag-and-drop circuit builder, sequential circuits, and downloadable lab reports.

## Future improvements

- Drag-and-drop multi-gate circuit builder
- Sequential circuits, flip-flops, and counters
- More Boolean expression patterns
- Exportable lab reports
