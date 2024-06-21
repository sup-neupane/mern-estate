import express from 'express';
import { signUp } from '../controllers/auth.controller.js';
import { signIn } from '../controllers/auth.controller.js';
import db from '../index.js'; 



const route = express.Router();
route.use(express.json());

route.post("/sign-up", (req, res, next) => signUp(req, res, next ,db));
route.post("/sign-in", (req, res, next) => signIn(req, res, next ,db));

export default route;