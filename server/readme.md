<!-- //py sqli_tester.py --># URL Security Scanner

A web-based SQL injection vulnerability scanner built as an Information Security project. Submit any URL and receive an instant, categorised report of detected SQLi payloads, complete with severity tiers and a downloadable HTML report.


## Overview

URL Security Scanner is a full-stack web application that takes a target URL, passes it to a Python-based SQLi testing script on the backend, and presents the results in a clean, severity-grouped interface. Results are organised into three tiers — **Most Critical**, **Moderate**, and **Least Critical** — and can be exported as a standalone HTML report.

---

## Features

- **SQL Injection Testing** — runs a Python scanner (`sqli_tester.py`) against the submitted URL
- **Severity Classification** — payloads are categorised into Most Critical, Moderate, and Least Critical
- **Expandable Payload Lists** — toggle each category open/closed to inspect individual payloads and the URLs they were found at
- **Downloadable HTML Report** — generates a self-contained, themed HTML file for offline review
- **Dark / Light Theme** — persists across sessions via `localStorage`
- **URL Validation** — enforces `http://` or `https://` protocol before submission
- **Real-time Scan Feedback** — spinner and status badge update live during the scan

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js, Express 5, ES Modules |
| Scanner | Python (via `child_process.execFile`) |
| Database | MongoDB + Mongoose (scaffolded, optional) |
| Dev Tooling | nodemon, dotenv |

---

## Project Structure

```
url-scanner-ISProj/
├── client/
│   ├── index.html          # Single-page frontend
│   ├── script.js           # Scan logic, UI state, report generation
│   └── styles.css          # Dark/light theme styles
└── server/
    ├── src/
    │   ├── index.js        # Express app entry point (POST /test-url)
    │   ├── constants.js    # DB name constant
    │   └── db/
    │       └── index.js    # Mongoose connection helper
    ├── package.json
    └── .env                # Environment variables (not committed)
```

> The Python scanner (`src/scanner/sqli_tester.py`) is invoked by the backend but is not included in the repository listing above — it must be present at that path for scans to run.

---

## Prerequisites

- **Node.js** v18 or later
- **Python** available on your system as `py` (Windows) or adjust the `execFile` call in `index.js` to use `python3`
- `sqli_tester.py` placed at `server/src/scanner/sqli_tester.py`
- (Optional) A MongoDB Atlas connection string if you want to enable the database layer

---

## Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd url-scanner-ISProj
```

### 2. Install server dependencies

```bash
cd server
npm install
```

### 3. Configure environment variables

Create or update `server/.env` (see [Environment Variables](#environment-variables) below).

### 4. Start the backend

```bash
npm run dev
```

The server starts on **port 5000** by default.

### 5. Open the frontend

Open `client/index.html` directly in your browser, or serve it with any static file server:

```bash
# Example using Python's built-in server from the client/ directory
python3 -m http.server 3000
```

Then visit `http://localhost:3000`.

---

## Environment Variables

Create `server/.env` with the following keys:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net
```

| Variable | Description |
|---|---|
| `PORT` | Port the Express server listens on (default `5000`) |
| `MONGODB_URI` | MongoDB connection string (required only if the DB layer is enabled) |

> **Never commit `.env` to version control.** It is already listed in `.gitignore`.

---

## Usage

1. Open the frontend in your browser.
2. Enter a full URL (must start with `http://` or `https://`).
3. Click **Scan Now**.
4. Wait for the scan to complete — the spinner indicates activity.
5. Review the status badge:
   - ✅ **Safe** — no payloads detected
   - ❌ **Vulnerable** — one or more payloads detected
6. Expand any severity category to view individual payloads and the URLs they triggered on.
7. Click **📥 Download Report** to save a themed HTML report to your machine.

---

## How It Works

```
Browser  →  POST /test-url  →  Express (Node.js)
                                     ↓
                           execFile('py', ['sqli_tester.py', url])
                                     ↓
                           Python scanner runs payloads against target URL
                                     ↓
                           stdout returned to Express
                                     ↓
             { result, report }  ←  JSON response
                                     ↓
                           Frontend parses lines, groups by severity
                           Renders UI + enables report download
```

The Python script outputs findings in a structured text format. The frontend parser looks for `Payloads:` headers and `- Payload:` / `URL:` pairs to populate the severity buckets.

---

## Security Notice

This tool is intended for **authorised security testing only**. Scanning URLs without explicit permission from the target owner is illegal in most jurisdictions. Always obtain proper authorisation before running any security assessment.

Additionally, the current backend passes user-supplied input directly to `execFile` as a script argument. In a production environment, you should validate and sanitise the URL server-side before passing it to the scanner.

---

## Known Limitations

- The Python interpreter is invoked as `py` (Windows convention). On macOS/Linux, update `index.js` to use `python3`.
- The MongoDB database connection is scaffolded but not actively used in the current version — scan results are not persisted.
- The frontend connects to `http://localhost:5000` — this must be updated if the backend is deployed remotely.
- No authentication or rate limiting is implemented on the `/test-url` endpoint.
