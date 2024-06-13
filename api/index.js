import express from "express";
import pg from "pg";
import bodyParser from "body-parser";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "mern-estate",
    password: "1122",
    port: 5432, 
  });

 const app = express();
 const port = 3000;

 db.connect();

 app.use(bodyParser.urlencoded({ extended: true }));


 app.use("/api/user", userRouter); 
 app.use("/api/auth", authRouter); 
 


 app.listen(port, () =>{
    console.log(`The server is running at ${port}`);
 })
 export default db;