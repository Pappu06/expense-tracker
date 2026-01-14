import { Router } from "express";
import { signup, login, verifyOtp } from "./user.controller.js";

const userRouter = Router();

// @POST  api/user/signup
userRouter.post("/signup", signup);

// @POST  api/user/verify-otp
userRouter.post("/verify-otp", verifyOtp);

// @POST  api/user/login
userRouter.post("/login", login);

export default userRouter;
