import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

import userRouter from "./routes/authRoute.js";
import noteRouter from "./routes/noteRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", userRouter);
app.use("/api/notes", noteRouter);


app.get("/", (req, res) => {
    res.send("Notes Manager API is running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});