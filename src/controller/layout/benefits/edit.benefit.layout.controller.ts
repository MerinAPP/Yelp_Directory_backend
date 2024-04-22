import { Response } from "express";
import asyncHandler from 'express-async-handler';
import { IUserMessage } from "../../../middleware/authJWT";
import layoutModel from "../../../model/layout.model";
import NotFoundError from "../../../errors/notFound.errors";
import { loop } from "../../../utils/help";
import { z } from "zod";
import { updateBenefitInput } from "../../../utils/validation/layout.validation";




export const updateBenefit = asyncHandler(async (req: IUserMessage<{}, {}, updateBenefitInput>, res: Response) => {
    let layout = await layoutModel.findOne();
    if (!layout) throw new NotFoundError('Layout not found')
    const body = req.body

    layout.benefit.question = body.question ? body.question : layout.benefit.question;
    layout.benefit.answer = body.answer ? body.answer : layout.benefit.answer
    await layout.save();
    res.status(200).json({
        success: true,
        data: layout
    });


})
