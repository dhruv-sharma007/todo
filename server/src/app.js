import express from "express";
import cookieParser from "cookie-parser";

const app = express();

//Middlewares
app.use(express.json({ limit: "16kb" }));
app.use(cookieParser());

//Routes
import userRoute from "./routes/user.route.js";
import todoRoute from "./routes/todo.route.js"

app.use("/api/v1/user", userRoute);
app.use("/api/v1/todo", todoRoute)

export default app;
