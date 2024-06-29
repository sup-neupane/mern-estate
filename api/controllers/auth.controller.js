import bcrypt from 'bcrypt';
import { promisify } from 'util';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { access } from 'fs';
dotenv.config();



const saltRounds = 10; 
const hashPassword = promisify(bcrypt.hash);

export const signUp = async (req, res, next, db) => {
    console.log(req.body);

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400).json({ error: "All fields are required" });
        return;
    }

    try {
        const hash = await hashPassword(password, saltRounds);
        const result = await db.query(
            "INSERT INTO users (username, email, password, created_at, updated_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *",
            [username, email, hash]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        if (err.code === '23505') { // Unique violation error code
            res.status(409).json({ error: "Username or email already exists" });
        } else {
            next(err); // Pass the error to the error handling middleware
        }
    }
};


export const signIn = async (req, res, next, db) => {
    const { email, password } = req.body;

    try {
        const validUser = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        

       if (validUser.rows.length === 0) {
        return next(errorHandler(404, "User not found"));
    }

        const [{ id:id ,email: validEmail, password: validPassword }] = validUser.rows;

        const match = await bcrypt.compare(password, validPassword);
        
        if (!match) {
            return next(errorHandler(401, "Invalid password"));
        }
        

        const token = jwt.sign({ id: id }, process.env.JWT_SECRET);
        const [{ password: pass, ...rest }] = validUser.rows;
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);

        
     
      



        // res.status(200).json({ message: "Sign-in successful" });
    } catch (error) {
        next(error);
    }
};


export const google = async (req, res, next,db) => {
    try {
        console.log(req.body);
        const { email} = req.body;
        const photo = req.body.photo || 'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg';
        const { name } = req.body;

        const  newUsername = name.split(' ').join('').toLowerCase() + Math.random().toString(36).slice(-4) ;


        const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length === 0) {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hash = await hashPassword(generatedPassword, saltRounds);
            const result = await db.query(
                "INSERT INTO users (username, email, password, created_at, updated_at, avatar) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $4) RETURNING *",
                [newUsername, email, hash, photo]
            );
            
            const token = jwt.sign({ id: result.rows[0].id }, process.env.JWT_SECRET);  
            res.cookie('access_token', token, { httpOnly: true }).status(201).json(result.rows[0]);
            


        } else {
           
            const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET);
            res.cookie('access_token', token, { httpOnly: true }).status(200).json(user.rows[0]);

        }
    } catch (error) {
      next(error)
    }
  }