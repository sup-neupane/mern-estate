import bcrypt from 'bcrypt';
import { promisify } from 'util';
import { errorHandler } from '../utils/error.js';

const saltRounds = 10; 
const hashPassword = promisify(bcrypt.hash);

export const updateUser = async (req, res, next, db) => {
    if (String(req.user.id) !== String(req.params.id)) {
        console.log(req.user.id, req.params.id);
        return next(errorHandler(403, 'You dont have permission to update this user'));
    }
    try {
        if (req.body.password) {
           req.body.password = await hashPassword(req.body.password, saltRounds);
        }

        const updatedUser = await db.query(
            `UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4 RETURNING *`
            [req.body.username, req.body.email, req.body.password, req.params.id]
        );

        const [{ password, ...user }] = updatedUser.rows;
        
    } catch (error) {
        next(error);
    }
}