import express from "express";
import pg from "pg";

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


 app.listen(port, () =>{
    console.log(`The server is running at ${port}`);
 })