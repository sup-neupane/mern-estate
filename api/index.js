import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import dotenv from 'dotenv';
dotenv.config();


const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
db.connect(
  (err) => {
    if (err) {
      console.error(`Error connecting to the database: ${err.stack}`);
      return;
    }
    console.log("Connected to the database");
});


const app = express();
const port = 3000;


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);


// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.listen(port, () => {
  console.log(`The server is running at port ${port}`);
});

export default db;
