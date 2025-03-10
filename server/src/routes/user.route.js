import express from "express";
import UserController from "../controller/user.controller.js";
import { verifyAccessToken } from "../middlewares/userAuth.mid.js";

const router = express.Router();

router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.post("/logout", verifyAccessToken, UserController.logoutUser);
router.post("/change-password", verifyAccessToken, UserController.changePassword)
router.post("/change-name", verifyAccessToken, UserController.changeUserName)

export default router;
