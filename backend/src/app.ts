import express from "express";
import linksRouter from "./routes/links";
import cors from "cors";

const app = express();

// Receive JSON
app.use(express.json());
app.use(cors());

// Routes
app.use(linksRouter);

export default app;