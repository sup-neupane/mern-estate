import express from 'express';
import { signUp } from '../controllers/auth.controller.js';
import db from '../index.js'; 



const route = express.Router();
route.use(express.json());

route.post("/sign-up", (req, res) => signUp(req, res, db));

export default route;