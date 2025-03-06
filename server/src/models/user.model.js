import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { conf } from "../conf/index.js";

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["Admin", "User"],
			default: "User",
		},
		refreshToken: {
			type: String,
		},
	},
	{ timestamps: true }
);

userSchema.pre("save", async function () {
	if (!this.isModified("password")) return;

	this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordCorrect = async function (password) {
	return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
	const accessToken = jwt.sign(
		{
			_id: this._id,
			name: this.name,
			email: this.email,
		},
		conf.accessToken,
		{ expiresIn: "1d" }
	);
	return accessToken
};

userSchema.methods.generateRefreshToken = function () {
	const refreshToken = jwt.sign(
		{
			_id: this._id,
		},
		conf.refreshToken,

		{ expiresIn: "10d" }
	);
	return refreshToken
};
const User = mongoose.model("User", userSchema);

export default User;
