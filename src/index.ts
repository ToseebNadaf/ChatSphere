import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router } from "./routes";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

// * Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Chat_App Server");
});

// * Routes
app.use("/api", router);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
