import bcrypt from 'bcrypt';
import { promisify } from 'util';

const saltRounds = 10; 
const hashPassword = promisify(bcrypt.hash);

export const updateUser = async (req, res, next, db) => {
    if (req.user.id !== req.params.id) {
        return res.status(403).send("You are not authorized to perform this action");
    }
    try {
        if (req.body.password) {
           req.body.password = await hashPassword(req.body.password, saltRounds);
        }

        const updatedUser = await db.query(
            "UPDATE users SET username = $1, email = $2, password = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *",
            [req.body.username, req.body.email, req.body.password, req.params.id]
        );

        const [{ password, ...user }] = updatedUser.rows;
        
    } catch (error) {
        next(error);
    }
}