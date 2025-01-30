import express, { json }  from "express";
import dotenv from "dotenv";

dotenv.config()
const server = express();

server.use(express.json());

server.listen(Number(process.env.PORT), "0.0.0.0", () => {
    console.log("Servidor está rodando!");
    
})