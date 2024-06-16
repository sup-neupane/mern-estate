import bcrypt from 'bcrypt';
import { promisify } from 'util';

const saltRounds = 10;
const hashPassword = promisify(bcrypt.hash);

export const signUp = async (req, res, db, next) => {
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
