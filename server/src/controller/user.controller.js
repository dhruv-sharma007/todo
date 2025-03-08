import { UserAuth } from "../services/userService/userAuth.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "express-async-handler";

class UserControl {
	constructor() {
		this.options = {
			httpsOnly: false,
			secure: false,
			sameSite: "strict",
		};
	}

	registerUser = asyncHandler(async (req, res) => {
		const { name, email, password } = req.body;

		const createdUser = await UserAuth.signupUser(name, email, password);

		res
			.status(200)
			.json(new ApiResponse(200, createdUser, "User created successfully"));
	});

	loginUser = asyncHandler(async (req, res) => {
		const { email, password } = req.body;

		const { accessToken, refreshToken, loggedInUser } =
			await UserAuth.loginUser(email, password);

		res
			.status(200)
			.cookie("accessToken", accessToken, this.options)
			.cookie("refreshToken", refreshToken, this.options)
			.json(
				new ApiResponse(
					200,
					{ user:loggedInUser},
					"User logged in successfully"
				)
			)
	});
	logoutUser = asyncHandler((req, res) => {
		res
		.clearCookie("accessToken")
		.clearCookie("refreshToken");
	})
}

const UserController = new UserControl();

export default UserController;
