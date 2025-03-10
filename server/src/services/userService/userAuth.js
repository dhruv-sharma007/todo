import User from "../../models/user.model.js";
import { check } from "../../utils/index.js";

class UserAuthentication {
	getTokens = async (userId) => {
		const user = await User.findById(userId);
		check(!user, 404, "User not found");
		const accessToken = user.generateAccessToken();
		const refreshToken = user.generateRefreshToken();

		user.refreshToken = refreshToken;
		await user.save({ validateBeforeSave: false });

		return { accessToken, refreshToken };
	};

	signupUser = async (name, email, password) => {
		check(!name || !email || !password, 400, "All field are required");
		check(
			[name, email, password].some(field => field?.trim() === ""),
			400,
			"All fields are required"
		);
		let existUser = await User.findOne({ email });
		console.log(existUser)
		check(existUser, 400, "User already exist");


		await User.create({
			name,
			email,
			password,
		});

		const createdUser = await User.findOne({ email }).select(
			" -password -refreshToken"
		);

		check(!createdUser, 404, "error while registering user");

		return createdUser;
	};

	loginUser = async (email, password) => {
		check(!email || !password, 400, "All fields are required");

		check(
			[email, password].some((field) => field?.trim() === ""),
			400,
			"All fields are required"
		);

		const user = await User.findOne({ email });

		check(!user, 404, "User not found");

		const isPasswordCorrect = await user.isPasswordCorrect(password);

		check(!isPasswordCorrect, 400, "Password Not valid");

		const loggedInUser = await User.findById(user._id).select(
			" -password -refreshToken "
		);
		const { accessToken, refreshToken } = await this.getTokens(user._id);
		return { accessToken, refreshToken, loggedInUser };
	};
}

const UserAuth = new UserAuthentication();

export { UserAuth };
