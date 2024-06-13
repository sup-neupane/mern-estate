export const signUp = async(req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: "Username, email, and password are required" });
    }

    try {
        const result = await db.query(
            "INSERT INTO users (username, email, password, created_at, updated_at) VALUES ($1, $2, $3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) RETURNING *",
            [username, email, password]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        if (err.code === '23505') { 
            res.status(409).json({ error: "Username or email already exists" });
        } else {
            console.error("Database error:", err);
            res.status(500).json({ error: "Internal server error" });
        }
    }

}