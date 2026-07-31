import express from "express"
import { registerUser, emailVerification, loginUser, logoutUser, forgotPassword, verifyOtp, changePassword, getCurrentUser } from "../Controllers/auth.controller.js";
import protect from "../MiddleWares/protect.middleware.js";

import { registerValidator , loginValidator, forgotPasswordValidator } from "../Validators/auth.validator.js";

import validateRequest from "../MiddleWares/validateRequest.middleware.js";

const router = express.Router();

router.post("/register", registerValidator, validateRequest, registerUser);
router.post("/verify-email" , emailVerification)
router.post("/login", loginValidator, validateRequest, loginUser)
router.post("/logout" , protect , logoutUser)
router.get("/me", protect, getCurrentUser);
router.post("/forgot-password"  , forgotPasswordValidator, validateRequest, forgotPassword)
router.post("/verify-otp/:email"  , verifyOtp)
router.post("/change-password/:email"  , changePassword)



export default router;