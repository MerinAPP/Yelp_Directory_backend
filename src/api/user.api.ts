import express from "express";
import { AuthJWT } from "../middleware/authJWT";

import { getAllUsers } from "../controller/user/getAll.user.controller";
import { isSuperAdminOrSystemAdmin } from "../middleware/role.middleware";
import validateSchema from "../middleware/validateSchema.middleware";
import { createUserSchema, getUsersSchema, updateUserSchema } from "../utils/validation/user.validation";
import { createUser } from "../controller/user/create.user.controller";
import { updateUser } from "../controller/user/update.user.controller";
import { deleteUser } from "../controller/user/delete.user.controller";


const router = express.Router();
router.get("/", AuthJWT, isSuperAdminOrSystemAdmin, validateSchema(getUsersSchema), getAllUsers)
router.post("/", AuthJWT, isSuperAdminOrSystemAdmin, validateSchema(createUserSchema), createUser)
router.patch("/:id", AuthJWT, isSuperAdminOrSystemAdmin, validateSchema(updateUserSchema), updateUser)
router.delete("/:id", AuthJWT, isSuperAdminOrSystemAdmin, validateSchema(updateUserSchema), deleteUser)





export default router;
