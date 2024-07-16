import express from "express";
import { updateUser } from "../controllers/user.controller.js";
import { verifyUser } from "../utils/verifyUser.js";
import db from '../index.js';

const route = express.Router();

route.post('/update/:id', verifyUser, async (req, res, next) => {
    try {
        await updateUser(req, res, next, db);
    } catch (error) {
        next(error);
    }
});

export default route;
