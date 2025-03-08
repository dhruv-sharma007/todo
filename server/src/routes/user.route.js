import express from "express";
import UserController from "../controller/user.controller.js";
import { verifyAccessToken } from "../middlewares/userAuth.mid.js";

const router = express.Router();

router.post("/register", UserController.registerUser);

router.post("/login", UserController.loginUser);

router.post("/logout", verifyAccessToken, UserController.logoutUser)
export default router;
