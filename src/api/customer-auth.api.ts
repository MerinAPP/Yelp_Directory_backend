import express from "express";


import validateSchema from "../middleware/validateSchema.middleware";
import { ForgotPasswordSchema, ResetPasswordSchema, activateUserSchema, changeOldPasswordSchema, googleLoginUserSchema, loginUserSchema, registerUserSchema, updateCustomerProfileSchema, updateProfileSchema } from "../utils/validation/auth.validation";
import { refreshToken, resetPasswordHandler, registerUser, profile, login, forgotPassword, logout, changePassword, activateUser } from '../controller/customer-auth/index.controller'
import { CustomerAuthJWT } from "../middleware/authJWT";
import { googleLogin } from "../controller/customer-auth/googleLogin.customer-auth.controller";
import { authMiddleware } from "../middleware/firebase";


const router = express.Router();

router.post("/signup", validateSchema(registerUserSchema), registerUser);
router.post("/activate", validateSchema(activateUserSchema), activateUser);
router.post("/login", validateSchema(loginUserSchema), login);
router.post("/google-login", validateSchema(googleLoginUserSchema), googleLogin);


router.get("/logout", logout);
router.get("/refresh", refreshToken)
router.post("/forgotPassword", validateSchema(ForgotPasswordSchema), forgotPassword)
router.post("/resetPassword", validateSchema(ResetPasswordSchema), resetPasswordHandler)
router.get("/profile", CustomerAuthJWT, profile)
router.patch("/changeOldPassword", CustomerAuthJWT, validateSchema(changeOldPasswordSchema), changePassword)







export default router;
