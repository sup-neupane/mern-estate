import express from "express";
import { user } from "../controllers/user.controller.js"; 

const route = express.Router();

route.get("/", user); 

export default route;
