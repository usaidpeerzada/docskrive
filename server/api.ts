// server/routes/api.ts
import express, { Router } from "express";
import { generateDocument } from "./document.controller";

const apiRouter: Router = express.Router();

apiRouter.post("/generate-document", generateDocument);

export default apiRouter;
