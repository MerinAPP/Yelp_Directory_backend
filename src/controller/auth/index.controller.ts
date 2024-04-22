import { activateUser } from "./activateEmail.auth.controller";
import { changePassword } from "./changePassword.auth.controller";
import { logout } from "./logout.auth.controller";
import { forgotPassword } from "./forgetPassword.auth.controller";
import { login } from "./login.auth.controller";
import { profile } from "./profile.auth.controller";
import { registerUser } from "./register.auth.controller";
import { resetPasswordHandler } from "./resetPassword.auth.controller";
import { refreshToken } from "./resetToken.auth.controller";

export { refreshToken, resetPasswordHandler, registerUser, profile, login, forgotPassword, logout, changePassword, activateUser }