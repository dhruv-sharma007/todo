import { TodoController } from "../controller/todo.controller.js"
import express from "express"
import { verifyAccessToken } from "../middlewares/userAuth.mid.js";


const router = express.Router()

router.post("/add-todo", verifyAccessToken, TodoController.addTodo);
router.get("/get-todos", verifyAccessToken, TodoController.getTodos)

export default router