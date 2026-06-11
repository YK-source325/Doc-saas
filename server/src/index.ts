import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import app from "./app.js";

const PORT = Number(process.env.PORT) || 8080;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// In produzione serve il build del client per tutti i path non-API
const clientDist = path.resolve(__dirname, "../../client/dist");
app.use(express.static(clientDist));
app.get(/^(?!\/api).*/, (_req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

app.listen(PORT, () => {
  console.log(`REVISORE server in ascolto sulla porta ${PORT}`);
});
