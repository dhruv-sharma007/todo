import { TodoService } from "../services/todoService/todoService.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/AsyncHandler.js";

class TodoControl {
	addTodo = asyncHandler(async (req, res) => {
		const { todo, status } = req.body;
		const user = req.user._id;

		const todoCreated = await TodoService.addTodo({ user, todo, status });
		if (!todoCreated) {
			throw new ApiError(500, "Problem in todo add in Service");
		}

		res
			.status(200)
			.json(new ApiResponse(200, todoCreated, "Todo created Successfully"));
	});
	getTodos = asyncHandler(async (req, res) => {
		const user = req.user._id;
		const todos = await TodoService.getAllTodo(user);

		res
			.status(201)
			.json(new ApiResponse(201, todos, "Todos Successfully fetched"));
	});
	removeTodo = asyncHandler(async (req, res) => {
		const userId = req.user._id;
		const todoId = req.params;

		await TodoService.removeTodo(todoId, userId);

		res.status(201).json(new ApiResponse(201, {}, "Todo Deleted successfully"));
	});
	updateTodo = asyncHandler(async (req, res) =>{
		const { todoId } = req.body

		if (!todoId){
			throw new ApiError(400, "TodoId is important for updating todo.")
		}
		const data = await TodoService.updateTodo(todoId)

		res
		.status(201)
		.json(new ApiResponse(201, "Todo updated Successfully"))
	})
}
export const TodoController = new TodoControl();
