import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import placesRouter from "./routes/places.js";
import dashboardRouter from "./routes/dashboard.js";
import partnerRouter from "./routes/partner.js";

const app = express();
const PORT = Number(process.env.PORT) || 8080;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(cookieParser());

app.get("/api/healthz", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/auth", authRouter);
app.use("/api/places", placesRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/partner", partnerRouter);

app.use("/api", (_req, res) => {
  res.status(404).json({ error: "Endpoint non trovato" });
});

// In produzione serve il build del client per tutti i path non-API
const clientDist = path.resolve(__dirname, "../../client/dist");
app.use(express.static(clientDist));
app.get(/^(?!\/api).*/, (_req, res) => {
  res.sendFile(path.join(clientDist, "index.html"));
});

// Gestione errori centralizzata
app.use(
  (err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err);
    res.status(500).json({ error: "Errore interno del server" });
  }
);

app.listen(PORT, () => {
  console.log(`REVISORE server in ascolto sulla porta ${PORT}`);
});
