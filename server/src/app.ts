import express from "express";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import placesRouter from "./routes/places.js";
import dashboardRouter from "./routes/dashboard.js";
import partnerRouter from "./routes/partner.js";
import setupRouter from "./routes/setup.js";
import subscriptionsRouter from "./routes/subscriptions.js";
import accountRouter from "./routes/account.js";
import assistantRouter from "./routes/assistant.js";

// App Express con le sole API: usata sia dal server locale (index.ts)
// sia dalla funzione serverless su Vercel (api/index.ts).
const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/api/healthz", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/setup", setupRouter);
app.use("/api/auth", authRouter);
app.use("/api/places", placesRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/partner", partnerRouter);
app.use("/api/subscriptions", subscriptionsRouter);
app.use("/api/account", accountRouter);
app.use("/api/assistant", assistantRouter);

app.use("/api", (_req, res) => {
  res.status(404).json({ error: "Endpoint non trovato" });
});

// Gestione errori centralizzata
app.use(
  (err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err);
    res.status(500).json({ error: "Errore interno del server" });
  }
);

export default app;
