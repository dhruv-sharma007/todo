import Todo from "../../models/todo.model.js";
import ApiError from "../../utils/ApiError.js";
import { getCache, setCache, removeCache } from "../cache.js";

class TodoSer {
	addTodo = async (children) => {
		const { user, todo, status } = children;
		const existTodo = await Todo.findOne({ todo })
		console.log(existTodo)
		if(existTodo){
			throw new ApiError(400, "Todo Already Exist")
		}

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
	removeTodo = async (todoId, userId) => {
		if (!todoId || !userId) {
			throw new ApiError(404, "todo and userId required");
		}
		const deletedTodo = await Todo.findByIdAndDelete(todoId);

		if (!deletedTodo) {
			throw new ApiError(404, "Todo Not Found");
		}
		if (deletedTodo) {
			const cacheKey = `key${userId}`;
			const findCache = await getCache(cacheKey);
			if (findCache) {
				await removeCache(cacheKey);
			}
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
			await setCache(cacheKey, todos, 3600);
			return todos;
		}

		if (!todos || todos.length === 0) {
			throw new ApiError(404, "Empty todos");
		}
		return todos;
	};
	updateTodo = async (userId, todoId, todo, status) => {
		if ([todo, status].some((field) => field.trim() === "")) {
			throw new ApiError(404, "All fields required");
		}

		if (!todoId && !userId) {
			throw new ApiError(400, "Atleast one field todo or status required");
		}
		let update = {};
		if (todo) update.todo = todo;
		if (status) update.status = status;
		const updateTodo = await Todo.findByIdAndUpdate(todoId, update, {
			new: true,
		});

		if (!updateTodo) {
			throw new ApiError(404, "Todo Not Found");
		}
		return updateTodo;
	};
}

export const TodoService = new TodoSer();
