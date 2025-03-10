import { TodoController } from "../controller/todo.controller.js";
import express from "express";
import { verifyAccessToken } from "../middlewares/userAuth.mid.js";

const router = express.Router();

router.post("/add-todo", verifyAccessToken, TodoController.addTodo);
router.post("/get-todos", verifyAccessToken, TodoController.getTodos);
router.post("/remove-todo", verifyAccessToken, TodoController.removeTodo);
router.post("/update-todo", verifyAccessToken, TodoController.updateTodo);
export default router;
