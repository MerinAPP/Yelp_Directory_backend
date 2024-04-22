import express from "express";
import { AuthJWT } from "../middleware/authJWT";
import { isAdmin, isBussinessOwner, isBussinessOwnerOrAdmin, isSuperOrSystemAdmin, isSystemAdmin } from "../middleware/role.middleware";
import validateSchema from "../middleware/validateSchema.middleware";
import { createRequestSchema, deleteRequestSchema, getRequestSchema, updateRequestSchema } from "../utils/validation/request.validation";
import { createRequest } from "../controller/request/create.request.controller";
import { getAllRequests } from "../controller/request/get.request.controller";
import { updateRequest } from "../controller/request/update.request.controller";
import { deleteRequest } from "../controller/request/delete.request.controller";

const router = express.Router();

router.post("/", AuthJWT, isBussinessOwnerOrAdmin, validateSchema(createRequestSchema), createRequest)
router.get("/", AuthJWT, isSuperOrSystemAdmin, validateSchema(getRequestSchema), getAllRequests)
router.patch("/:request_id", AuthJWT, isSuperOrSystemAdmin, validateSchema(updateRequestSchema), updateRequest)
router.delete("/:request_id", AuthJWT, isSuperOrSystemAdmin, validateSchema(deleteRequestSchema), deleteRequest)









export default router;
