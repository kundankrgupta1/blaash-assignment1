import express from "express";
import { userLogin, userRegistration } from "../controller/user.controller.js";
const userRouter = express.Router();

userRouter.post("/reg", userRegistration);
userRouter.post("/login", userLogin);

export default userRouter;