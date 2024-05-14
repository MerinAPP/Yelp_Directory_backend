import { Request, Response } from "express";
import bussinessModel from "../../model/bussiness.model";
import NotFoundError from "../../errors/notFound.errors";
import requestModel from "../../model/request.model";
import asyncHandler from "express-async-handler";
import { updateRequestInput, updateRequestSchema } from "../../utils/validation/request.validation";
import { z } from "zod";
import sponserModel from "../../model/sponser";
import { updateSponserInput, updateSponserSchema } from "../../utils/validation/sponser.validation";
import ISponsor from "../../interfaces/sponser.interface";
import { loop } from "../../utils/help";
import { uploadFileToSpaces } from "../../config/spaces";




//@desc update sponser
//@method PATCH  /sponser/:sponser_id
//@access private
export const updateSponser = asyncHandler(async (req: Request<z.TypeOf<typeof updateSponserSchema>["params"], {}, updateSponserInput>, res: Response) => {
    const sponserId = req.params.sponser_id
    const sponser = await sponserModel.findById(sponserId)
    if (!sponser) throw new NotFoundError('Sponser not found')
    const body = { ...req.body } as Partial<ISponsor>
    if (req?.file) {
        const url = await uploadFileToSpaces(req.file);
        body.coverImage = {
            public_id: url.Key,
            url: url.Location
        };
    }
    const updatedSponser = await sponserModel.findByIdAndUpdate(sponserId, body, { new: true })
    res.status(200).json({
        message: 'Sponser Updated sucessfully',
        sucess: true,
        body: updatedSponser
    })


})