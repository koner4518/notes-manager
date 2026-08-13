import express from "express";
import { registerUser, loginUser, deleteAccount } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.delete("/delete-account", authMiddleware, deleteAccount);

export default userRouter;