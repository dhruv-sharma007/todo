import { TodoService } from "../services/todoService/todoService.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

class TodoControl {
	addTodo = async(req, res) => {
        const {todo, status} = req.body;
        const user = req.user._id

        if(!todo || !status){
            throw new ApiError(400, "All fields are required");
        }

        if(!_id){
            throw new ApiError(400, "User Id not found");
        }

        if([todo, status].some((field)=> field.trim()="")){
            throw new ApiError(400, "All fields are required")
        }

        const todoCreated = TodoService.addTodo({user, todo, status})
        if(!todoCreated){
            throw new ApiError(400, "Problem in todo add in controller");
            
        }

        res
        .status(200)
        .json(new ApiResponse(200, todoCreated, "Todo created Successfully"))
    };
}
export const TodoController =new TodoControl();
