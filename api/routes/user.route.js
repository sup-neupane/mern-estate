import express from "express";
import { userLogic } from "../controllers/user.controller.js"; 

const userRouter = express.Router();

userRouter.get("/", userLogic); 

export default userRouter;
