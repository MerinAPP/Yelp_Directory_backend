import asyncHandler from 'express-async-handler';
import { Response } from "express";
import { IUserMessage } from '../../middleware/authJWT';
import NotFoundError from '../../errors/notFound.errors';
import { z } from 'zod';
import sponserModel from '../../model/sponser';
import { deleteSponserSchema } from '../../utils/validation/sponser.validation';


//@desc update sponser
//@method PATCH  /sponser/:sponser_id
//@access private
export const deleteSponser = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof deleteSponserSchema>["params"], {}, {}>, res: Response) => {
    const existingSponser = await sponserModel.findById(req.params.sponser_id)
    if (!existingSponser) throw new NotFoundError("sponser not found")
    const deleteSponser = await sponserModel.findByIdAndDelete(req.params.sponser_id)
    if (deleteSponser)
        res.json({ success: true, message: "sponser deleted sucessfully" });
})