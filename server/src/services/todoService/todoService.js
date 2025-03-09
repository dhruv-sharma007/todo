import Todo from "../../models/todo.model.js";
import ApiError from "../../utils/ApiError.js";
import { getCache, setCache } from "../cache.js";

class TodoSer {
	addTodo = async (children) => {
		const { user, todo, status } = children;

		if (!user || !todo) {
			throw new ApiError(400, "All Fields are required");
		}
		if ([todo].some((field) => field?.trim() == "")) {
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
		return createdTodo;
	};
	removeTodo = async (todoId) => {
		const deletedTodo = await Todo.findByIdAndDelete(todoId);
		if (!deletedTodo) {
			throw new ApiError(404, "Todo not found");
		}
		return true;
	};
	getAllTodo = async (user) => {
		if (!user) return null;

		if (user === "") return null;
		const cacheKey = `key${user}`;

		let todos = await getCache(cacheKey);

		if (!todos) {
			todos = await Todo.aggregate([
				{ $match: { user } },
				{ $sort: { createdAt: -1 } },
			]);
			await setCache(cacheKey, todos, 3600)
			return todos;
		}

		if (!todos || todos.length === 0) {
			throw new ApiError(404, "Empty todos");
		}
		return todos;
	};
}

export const TodoService = new TodoSer();
