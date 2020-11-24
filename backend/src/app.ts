import express from "express";
import linksRouter from "./routes/links";

const app = express();

// Receive JSON
app.use(express.json());

// Routes
app.use(linksRouter);

export default app;