import express from "express";
import {createNote, getNotes, getNoteById, updateNote, deleteNote} from "../controllers/noteController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const noteRouter = express.Router();

noteRouter.post("/", authMiddleware, createNote);
noteRouter.get("/", authMiddleware, getNotes);
noteRouter.get("/:id", authMiddleware, getNoteById);
noteRouter.put("/:id", authMiddleware, updateNote);
noteRouter.delete("/:id", authMiddleware, deleteNote);

export default noteRouter;