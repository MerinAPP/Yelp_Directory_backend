import { Response } from "express";
import asyncHandler from 'express-async-handler';
import { IUserMessage } from "../../../middleware/authJWT";
import layoutModel from "../../../model/layout.model";
import NotFoundError from "../../../errors/notFound.errors";




export const deleteHero = asyncHandler(async (req: IUserMessage, res: Response) => {
    let layout = await layoutModel.findOne();
    if (!layout) throw new NotFoundError('Layout not found')
    layout.hero = undefined
    await layout.save();
    res.status(200).json({
        success: true,
    });


})
