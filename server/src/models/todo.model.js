import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
	{
		user: {
			ref: "User",
			type: mongoose.Schema.Types.ObjectId,
			required: true,
		},

		todo: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ["Completed", "Pending"],
			default: "Pending",
		},
	},
	{ timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
