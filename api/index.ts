// Funzione serverless Vercel: tutte le richieste /api/* arrivano qui
// (rewrite in vercel.json) e vengono gestite dall'app Express.
import app from "../server/src/app.js";

export default app;
