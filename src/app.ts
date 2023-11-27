import express, { Application, Request, Response } from "express";
import { config } from "./config";

const app: Application = express();

console.log({
  port: config.port,
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
