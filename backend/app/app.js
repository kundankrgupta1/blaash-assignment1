import cors from "cors"
import express from "express";
import userRouter from "../routes/user.route.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRouter)
export default app;
