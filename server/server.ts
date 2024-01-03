import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import apiRoutes from "./api";
import cors from "cors";

const app: Application = express();

app.use(cors());
const PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api", apiRoutes);

// Default route
app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ message: "Not Found" });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
