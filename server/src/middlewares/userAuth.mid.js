import { conf } from "../conf/index.js";
import User from "../models/user.model.js";
import { ApiError, check } from "../utils/index.js";
import jwt from "jsonwebtoken";

const verifyAccessToken = async (req, res, next) => {
	try {
		const accessToken = req?.cookies.accessToken;

		check(!accessToken, 400, "You are not authenticated");

		const decodedToken = await jwt.verify(accessToken, conf.accessToken);

		check(!decodedToken, 400, "Access token not valid");

		const user = await User.findById(decodedToken._id).select(
			" -password -refreshToken "
		);

		req.user = user;

		next();
	} catch (error) {
		throw new ApiError(400, error?.message || "Invalid AccessToken");
	}
};

export { verifyAccessToken }