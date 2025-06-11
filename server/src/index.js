// import dotenv from "dotenv";
// import connectDB from "./db/index.js";

// dotenv.config({
//   path: "./.env"
// });

// connectDB();


// import express from "express";
// import cors from "cors";
// import { execFile } from "child_process";
// import path from "path";
// import { fileURLToPath } from "url";

// const app = express();
// app.use(cors());
// app.use(express.json());

// const __dirname = path.dirname(fileURLToPath(import.meta.url));

// app.post("/test-url", (req, res) => {
//   const { url } = req.body;
//   const scriptPath = path.join(__dirname, "scanner", "sqli_tester.py");

//   const process = execFile("py", [scriptPath, url], (err, stdout, stderr) => {
//     if (err) {
//       console.error("Python error:", stderr || err);
//       return res.status(500).json({ error: stderr || err.message });
//     }

//     return res.json({ result: stdout });
//   });
// });

// app.listen(5000, () => {
//   console.log("🟢 Backend server running on port 5000");
// });


import express from "express";
import cors from "cors";
import { execFile } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.post("/test-url", (req, res) => {
  const { url } = req.body;
  const scriptPath = path.join(__dirname, "scanner", "sqli_tester.py");

  execFile("python3", [scriptPath, url], (err, stdout, stderr) => {
    if (err) {
      console.error("Python error:", stderr || err);
      return res.status(500).json({ error: stderr || err.message });
    }



    const report = `
    Scan Report
    ====================
    URL: ${url}
    Scan Time: ${new Date().toLocaleString()}
    --------------------
    ${stdout.trim()}
    `;



    return res.json({ result: stdout, report });
  });
});

app.listen(5000, () => {
  console.log("🟢 Backend server running on port 5000");
});
