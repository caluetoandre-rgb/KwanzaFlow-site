import express from "express";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// API health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Serve static files from Vite build output
const distPath = path.join(process.cwd(), 'dist');
app.use(express.static(distPath));

app.get('*all', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`SiteKwanzaFlow server listening on port ${PORT}`);
});
