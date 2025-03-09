import { Todo } from "../../models/index.js";
import asyncHandler from "../../utils/AsyncHandler.js";
import ApiError from "../../utils/ApiError.js";

class TodoSer {
	addTodo = asyncHandler(async (Todo) => {
		const { user, todo, status } = Todo;

		if (!user || !todo || !status) {
			throw new ApiError(400, "All Fields are required");
		}
		if ([user, todo, status].some((field) => field?.trim() == "")) {
			throw new ApiError(400, "All Fields are required");
		}
		const createdTodo = await Todo.create({
			user,
			todo,
			status,
		});

		if (!createdTodo) {
			throw new ApiError(500, "Error while creating Todo");
		}
		return true;
	});
	removeTodo = asyncHandler(async (todoId) => {
		const deletedTodo = await Todo.findByIdAndDelete(todoId);
		if (!deletedTodo) {
			throw new ApiError(404, "Todo not found");
		}
		return true;
	});
}

export const TodoService = new TodoSer();
