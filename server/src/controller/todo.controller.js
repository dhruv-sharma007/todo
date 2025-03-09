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
		const todos =await TodoService.getAllTodo(user);

		res
			.status(201)
			.json(new ApiResponse(201, todos, "Todos Successfully fetched"));
	});
}
export const TodoController = new TodoControl();
