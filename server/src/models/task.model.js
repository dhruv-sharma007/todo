import mongoose, { mongo } from "mongoose";

const todoSchema = new mongoose.Schema({
	user: {
		ref: "User",
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	todos: [
		{
			todo: {
				type: String,
                required: true,
			},
            status:{
                type: String,
                enum:["Completed", "Pending"]
            },
            createdAt:{
                type: Date,
                default: Date.now,
            }
		},
	],
});

const Todo = mongoose.model("Todo", todoSchema)

export default Todo
