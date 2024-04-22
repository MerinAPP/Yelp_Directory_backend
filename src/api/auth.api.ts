import express from "express";


import { AuthJWT } from "../middleware/authJWT";
import validateSchema from "../middleware/validateSchema.middleware";
import { ForgotPasswordSchema, ResetPasswordSchema, activateUserSchema, changePasswordSchema, loginUserSchema, registerUserSchema, } from "../utils/validation/auth.validation";
import { refreshToken, resetPasswordHandler, registerUser, login, forgotPassword, logout, changePassword, activateUser } from '../controller/auth/index.controller'
import { systemLogin } from "../controller/auth/superAdminLogin.auth.controller";


const router = express.Router();

router.post("/signup", validateSchema(registerUserSchema), registerUser);
router.post("/activate", validateSchema(activateUserSchema), activateUser);
router.post("/login", validateSchema(loginUserSchema), login);
router.post("/system-login", validateSchema(loginUserSchema), systemLogin);


router.post("/logout", logout);
router.post("/refresh", refreshToken)
router.post("/forgotPassword", validateSchema(ForgotPasswordSchema), forgotPassword)
router.post("/resetPassword", validateSchema(ResetPasswordSchema), resetPasswordHandler)
router.patch("/change", AuthJWT, validateSchema(changePasswordSchema), changePassword)








export default router;
