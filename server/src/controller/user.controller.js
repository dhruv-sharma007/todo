import { UserAuth } from "../services/userService/userAuth.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/index.js";
import UserService from "../services/userService/userProfile.js";

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
					{ user: loggedInUser },
					"User logged in successfully"
				)
			);
	});
	logoutUser = asyncHandler((req, res) => {
		res
			.clearCookie("accessToken")
			.clearCookie("refreshToken")
			.status(201)
			.json(new ApiResponse(201, {}, "User logged out successfully"));
	});
	changeUserName = asyncHandler(async (req, res) => {
		const { newName } = req.body;
		const userId = req.user?._id;

		await UserService.nameChange(userId, newName);

		res
			.status(201)
			.json(new ApiResponse(201, {}, "User name changed successfully"));
	});
	changePassword = asyncHandler(async (req, res) => {
		const { newPassword, oldPassword } = req.body;
		const userId = req.user?._id;

		const data = await UserService.passwordChange(oldPassword, newPassword, userId);

		res
		.status(201)
		.json(new ApiResponse(201, data, "Password changed successfully"));
	})
}

const UserController = new UserControl();

export default UserController;
