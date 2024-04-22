import express from "express";
import auth from "./auth.api"
import customerAuth from "./customer-auth.api"
import profile from "./profile.api"
import user from "./user.api"
import business from "./business.api"
import request from "./request.api"
import sponser from "./sponser.api"
import category from "./category.api"
import productcategory from "./product-category.api"
import advert from "./advert.api"
import notification from "./notification.api"
import trans from "./test.api"
import layout from "./layout.api"
import event from "./event.api"
import discount from "./discount.api"
import subsciption from "./subsciption.api"






const router = express.Router()
router.use("/auth", auth);
router.use("/customer-auth", customerAuth);
router.use("/profile", profile);
router.use("/users", user);
router.use("/business", business);
router.use("/request", request);
router.use("/category", category);
router.use("/product-category", productcategory);
router.use("/sponser", sponser);
router.use("/advert", advert);
router.use("/notification", notification);
router.use("/transaltion", trans);
router.use("/layout", layout);
router.use("/event", event);
router.use("/discount", discount);
router.use("/subscribe", subsciption);















export default router;