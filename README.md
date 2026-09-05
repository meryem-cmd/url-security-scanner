# URL Security Scanner

> A full-stack web tool for detecting SQL injection vulnerabilities in target URLs, built as an Information Security course project.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=flat-square&logo=vercel)](https://url-security-scanner-gilt.vercel.app)
![Node.js](https://img.shields.io/badge/Node.js-v18+-green?style=flat-square&logo=node.js)
![Python](https://img.shields.io/badge/Python-3.x-blue?style=flat-square&logo=python)
![Express](https://img.shields.io/badge/Express-5-lightgrey?style=flat-square&logo=express)

---

## What It Does

Submit any URL and the scanner runs a battery of SQL injection payloads against it. Results are grouped by severity — **Most Critical**, **Moderate**, and **Least Critical** — and rendered in a clean, interactive interface. You can expand each category to inspect individual payloads and export the full findings as a self-contained HTML report.

---

## Features

- **SQL Injection Testing** — invokes a Python-based scanner (`sqli_tester.py`) on the submitted URL
- **Severity Classification** — payloads bucketed into three tiers for quick triage
- **Expandable Results** — drill into each category to see the exact payload and the URL it triggered on
- **Downloadable HTML Report** — generates a themed, offline-ready report file
- **Dark / Light Theme** — persists across sessions via `localStorage`
- **URL Validation** — rejects inputs missing `http://` or `https://` before the scan starts
- **Live Scan Feedback** — spinner and status badge update in real time

---

## Tech Stack

| Layer      | Technology                             |
|------------|----------------------------------------|
| Frontend   | HTML5, CSS3, Vanilla JavaScript        |
| Backend    | Node.js · Express 5 · ES Modules       |
| Scanner    | Python (spawned via `child_process`)   |
| Database   | MongoDB + Mongoose *(scaffolded)*      |
| Dev Tools  | nodemon · dotenv                       |

---

## Project Structure

```
url-scanner-ISProj/
├── client/
│   ├── index.html       # Single-page frontend
│   ├── script.js        # Scan logic, UI state, report generation
│   └── styles.css       # Dark / light theme styles
└── server/
    ├── src/
    │   ├── index.js     # Express entry point — POST /test-url
    │   ├── constants.js # DB name constant
    │   └── db/
    │       └── index.js # Mongoose connection helper
    ├── package.json
    └── .env             # Environment variables (not committed)
```

> **Note:** The Python scanner (`server/src/scanner/sqli_tester.py`) must be present for scans to run. It is not included in this repository.

---

## Getting Started

### Prerequisites

- Node.js v18 or later
- Python available as `py` (Windows) or `python3` (macOS/Linux — update `execFile` in `index.js` accordingly)
- `sqli_tester.py` placed at `server/src/scanner/sqli_tester.py`
- *(Optional)* A MongoDB Atlas URI if you want to enable result persistence

### Installation

```bash
# 1. Clone the repo
git clone https://github.com/meryem-cmd/url-security-scanner.git
cd url-security-scanner

# 2. Install server dependencies
cd server
npm install

# 3. Configure environment variables
cp .env.example .env   # then fill in values

# 4. Start the backend
npm run dev            # runs on http://localhost:5000

# 5. Open the frontend
cd ../client
python3 -m http.server 3000
# then visit http://localhost:3000
```

### Environment Variables

Create `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net
```

| Variable      | Description                                              |
|---------------|----------------------------------------------------------|
| `PORT`        | Port the Express server listens on (default `5000`)      |
| `MONGODB_URI` | MongoDB connection string (only needed if DB is enabled) |

> `.env` is listed in `.gitignore` — never commit it.

---

## How It Works

```
Browser  →  POST /test-url  →  Express (Node.js)
                                      ↓
                            execFile('py', ['sqli_tester.py', url])
                                      ↓
                            Python scanner fires payloads at target URL
                                      ↓
                            stdout piped back to Express
                                      ↓
              { result, report }  ←  JSON response
                                      ↓
                            Frontend parses lines, groups by severity
                            Renders UI + enables report download
```

The Python script outputs findings in a structured text format. The frontend parser looks for `Payloads:` headers and `- Payload:` / `URL:` pairs to populate the severity buckets.

---

## Usage

1. Open the frontend in your browser.
2. Enter a full URL beginning with `http://` or `https://`.
3. Click **Scan Now** and wait for the spinner to finish.
4. Check the status badge:
   - ✅ **Safe** — no SQLi payloads detected
   - ❌ **Vulnerable** — one or more payloads triggered
5. Expand any severity tier to inspect individual payloads.
6. Click **📥 Download Report** to save a themed HTML report locally.

---

## Known Limitations

| Limitation | Detail |
|---|---|
| Python path | Hardcoded as `py` (Windows). Change to `python3` for macOS/Linux. |
| No persistence | MongoDB is scaffolded but not wired up — scan results are not saved. |
| Local frontend | Frontend points to `http://localhost:5000`; update this for remote deployment. |
| No auth / rate limiting | The `/test-url` endpoint is open with no throttling. |

---

## Security Notice

This tool is designed for **authorised security testing only**. Running scans against URLs without explicit permission from the target owner is illegal in most jurisdictions. Always obtain proper authorisation before conducting any security assessment.

The current backend passes user input directly to `execFile` as a script argument. Before deploying to a production environment, validate and sanitise all user-supplied input server-side.

---

## License

This project was built as an academic Information Security assignment. Refer to the repository for licensing details.
