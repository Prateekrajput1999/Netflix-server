import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDb } from "./src/services/storageService.js";
import { moviesRouter } from "./src/routes/moviesRouter.js";
import { signUpRouter } from "./src/routes/signUpRouter.js";
import { LoginRouter } from "./src/routes/loginRouter.js";

const app = express();

app.use(
  cors({
    origin: [
      "https://master.d3mswxqa7vdfhx.amplifyapp.com",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(bodyParser.json());

app.use(cookieParser());

app.use("*", (req, res, next) => {
  console.log("Incoming server request...");
  next();
});

app.use("/movies", moviesRouter);

app.use("/signup", signUpRouter);

app.use("/login", LoginRouter);

app.get("*", (req, res) => {
  res.status(404).send({
    staus: "FAILED",
    error: "This express app couldn't find any route",
  });
});

const runServer = async () => {
  await connectDb();
  app.listen(3003);
};

runServer();
