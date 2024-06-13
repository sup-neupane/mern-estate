import bcrypt from 'bcrypt';

const saltRounds = 10;

export const signUp = async(req, res, db) => {

    console.log(req.body);

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        res.status(400).json({ error: "All fields are required" });
        return;
    }

    try {
        bcrypt.hash(password, saltRounds, async(err, hash) => {
            if(err){
                console.error("Error hashing password:", err);
            }else{
        await db.query(
            "INSERT INTO users (username, email, password, created_at, updated_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *",
            [username, email, hash]
        );
    }
    });
    } catch (err) {
        if (err.code === '23505') { 
            res.status(409).json({ error: "Username or email already exists" });
        } else {
            console.error("Database error:", err);
            res.status(500).json({ error: "Internal server error" });
        }
    }

}