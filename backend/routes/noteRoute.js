import express from "express";
import {createNote, getNotes} from "../controllers/noteController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const noteRouter = express.Router();

noteRouter.post("/", authMiddleware, createNote);
noteRouter.get("/", authMiddleware, getNotes);

export default noteRouter;