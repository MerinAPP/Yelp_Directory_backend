
import { Response, NextFunction } from "express"
import { IUserMessage, UserDataType } from "../middleware/authJWT";
import customerModel from "../model/customer.model";
import userModel from "../model/user.model";
import Role from "../config/roles";

export const isAdmin = async (req: IUserMessage, res: Response, next: NextFunction) => {
    const { userId, role } = req.userData as UserDataType;
    const user = await userModel.findOne({ _id: userId })
    if (!user) {
        return res.status(403)
            .json({
                message: "Invalid JWT token",
                success: false
            });
    }
    if (role === Role.ADMIN) {
        res.status(200)
        next();
    } else {
        res.status(403)
            .json({
                message: "Unauthorized access",
                success: false
            });
    }
}

export const isBussinessOwner = async (req: IUserMessage, res: Response, next: NextFunction) => {
    const { userId, role } = req.userData as UserDataType;
    const user = await userModel.findOne({ _id: userId })
    if (!user) {
        return res.status(403)
            .json({
                message: "Invalid JWT token",
                success: false
            });
    }
    if (role === Role.BUSINESS_OWNER) {
        res.status(200)
        next();
    } else {
        res.status(403)
            .json({
                message: "Unauthorized access",
                success: false
            });
    }
}
export const isBussinessOwnerOrAdmin = async (req: IUserMessage, res: Response, next: NextFunction) => {
    console.log(",,,,,,,,", req.userData)
    const { userId, role } = req.userData as UserDataType;
    console.log(role)
    const user = await userModel.findOne({ _id: userId })
    if (!user) {
        return res.status(403)
            .json({
                message: "Invalid JWT token",
                success: false
            });
    }
    if (role === Role.BUSINESS_OWNER || role === Role.ADMIN) {
        res.status(200)
        next();
    } else {
        res.status(403)
            .json({
                message: "Unauthorized access",
                success: false
            });
    }
}


export const isCUSTOMER = async (req: IUserMessage, res: Response, next: NextFunction) => {
    const { userId, role } = req.userData as UserDataType;
    const user = await customerModel.findOne({ _id: userId })
    if (!user) {
        return res.status(403)
            .json({
                message: "Invalid JWT token",
                success: false
            });
    }
    if (role === Role.USER) {
        res.status(200)
        next();
    } else {
        res.status(403)
            .json({
                message: "Unauthorized access",
                success: false
            });
    }
}
export const isSystemAdmin = async (req: IUserMessage, res: Response, next: NextFunction) => {
    const { userId, role } = req.userData as UserDataType;
    const user = await userModel.findOne({ _id: userId })
    if (!user) {
        return res.status(403)
            .json({
                message: "Invalid JWT token",
                success: false
            });
    }
    if (role === Role.SYSTEM_ADMIN) {
        res.status(200)
        next();
    } else {
        res.status(403)
            .json({
                message: "Unauthorized access",
                success: false
            });
    }
}
export const isSuperAdmin = async (req: IUserMessage, res: Response, next: NextFunction) => {
    const { userId, role } = req.userData as UserDataType;
    const user = await userModel.findOne({ _id: userId })
    if (!user) {
        return res.status(403)
            .json({
                message: "Invalid JWT token",
                success: false
            });
    }
    if (role === Role.SUPER_ADMIN) {
        res.status(200)
        next();
    } else {
        res.status(403)
            .json({
                message: "Unauthorized access",
                success: false
            });
    }
}

export const isSuperOrSystemAdmin = async (req: IUserMessage, res: Response, next: NextFunction) => {
    const { userId, role } = req.userData as UserDataType;
    console.log(role)
    const user = await userModel.findOne({ _id: userId })
    if (!user) {
        return res.status(403)
            .json({
                message: "Invalid JWT token",
                success: false
            });
    }
    if (role === Role.SUPER_ADMIN || role === Role.SYSTEM_ADMIN) {
        res.status(200)
        next();
    } else {
        res.status(403)
            .json({
                message: "Unauthorized access",
                success: false
            });
    }
}

export const isSuperAdminOrSystemAdmin = async (req: IUserMessage, res: Response, next: NextFunction) => {
    const { userId, role } = req.userData as UserDataType;
    console.log(role)
    const user = await userModel.findOne({ _id: userId })
    if (!user) {
        return res.status(403)
            .json({
                message: "Invalid JWT token",
                success: false
            });
    }
    if (role === Role.SUPER_ADMIN || role === Role.BUSINESS_OWNER) {
        res.status(200)
        next();
    } else {
        res.status(403)
            .json({
                message: "Unauthorized access",
                success: false
            });
    }
}