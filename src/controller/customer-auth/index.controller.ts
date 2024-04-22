import { activateUser } from "./activateEmail.customer-auth.controller";
import { changePassword } from "./changePassword.customer-auth.controller";
import { logout } from "./logout.customer-auth.controller";
import { forgotPassword } from "./forgetPassword.customer-auth.controller";
import { login } from "./login.customer-auth.controller";
import { profile } from "../profile/get.profile.controller";
import { registerUser } from "./register.customer-auth.controller";
import { resetPasswordHandler } from "./resetPassword.customer-auth.controller";
import { refreshToken } from "./resetToken.customer-auth.controller";

export { refreshToken, resetPasswordHandler, registerUser, profile, login, forgotPassword, logout, changePassword, activateUser }