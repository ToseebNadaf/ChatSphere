import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router } from "./routes";
import { Server } from "socket.io";
import { createServer } from "http";
import { setupSocket } from "./socket";
import { createAdapter } from "@socket.io/redis-streams-adapter";
import redis from "./config/redis";
import { instrument } from "@socket.io/admin-ui";
import { consumeMessages } from "./helper";
import { connectKafkaProducer } from "./config/kafka.config";

dotenv.config();

const app: Application = express();
const port = process.env.PORT!;

const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["https://admin.socket.io"],
    credentials: false,
  },
  adapter: createAdapter(redis),
});

instrument(io, {
  auth: false,
  mode: "development",
});

setupSocket(io);
export { io };

// * Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Chat_App Server");
});

// * Routes
app.use("/api", router);

// * Add Kafka Producer
connectKafkaProducer().catch((err) => console.log("Kafka Consumer error", err));

consumeMessages(process.env.KAFKA_TOPIC!).catch((err) =>
  console.log("The Kafka Consume error", err)
);

server.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
