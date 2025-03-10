import User from "../../models/user.model";
import { ApiError } from "../../utils";

class UserService {
	nameChange = async (userId, newName) => {
		if ([userId, newName].some((field) => field.trim() === "")) {
			throw new ApiError(400, "All Fields os required");
		}
		try {
			let user = await User.findByIdAndUpdate(
				userId,
				{ name: newName },
				{ new: true }
			);
			return {};
		} catch (err) {
			throw new ApiError(500, "Error while changing name");
		}
	};

	passwordChange = async (oldPassword, newPassword, userId) => {
		if (!oldPassword || !newPassword || !userId) {
			throw new ApiError(400, "All fields are required!");
		}
		if (
			[oldPassword, newPassword, userId].some((field) => field?.trim() === "")
		) {
			throw new ApiError(400, "All fields are required!");
		}

		let user = await User.findById(userId);
		if (!user) {
			throw new ApiError(404, "User not found");
		}

		const checkPassword = await user.isPasswordCorrect(oldPassword);

		if (!checkPassword) {
			throw new ApiError(400, "Password Incorrect");
		}
		user.password = newPassword;
		try {
			await user.save();
			return { success: true, message: "Password changed successfully" };
		} catch (err) {
			throw new ApiError(500, "Error while updating Password");
		}
	};
}

let UserServiceInstance = new UserService();

export default UserServiceInstance;