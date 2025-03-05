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

userSchema.pre("save", function (next) {
	if (!this.isModified("password")) return next();

	return bcrypt.hash(this.password, 10);
});

userSchema.methods.generateAccessToken(function () {
	const token = jwt.sign(
		{
			_id: this._id,
			name: this.name,
			email: this.email,
		},
		conf.accessToken,
		{ expiresIn: conf.accessTokenExpiry }
	);
});

userSchema.methods.generateRefreshToken(function () {
	const token = jwt.sign(
		{
			_id: this._id,
			name: this.name,
			email: this.email,
		},
		conf.refreshToken,
		{ expiresIn: conf.refreshTokenExpiry }
	);
});

const User = mongoose.model("User", userSchema);

export default User;
