import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IUserMessage } from '../../middleware/authJWT';
import sponserModel from '../../model/sponser';
import { createSponserInput } from '../../utils/validation/sponser.validation';
import { loop } from '../../utils/help';
import ISponsor from '../../interfaces/sponser.interface';
import { uploadFileToSpaces } from '../../config/spaces';



//@desc create  sponser
//@method POST  /sponser
//@access private
const createSponser = asyncHandler(async (req: IUserMessage<object, object, createSponserInput>, res: Response) => {
    const body = { ...req.body } as Partial<ISponsor>
    if (req?.file) {
        const url = await uploadFileToSpaces(req.file);
        body.coverImage = {
            public_id: url.Key,
            url: url.Location
        };
    }
    console.log(body)
    const response = await sponserModel.create(body)
    res.status(201).json({
        message: 'Sponser created sucessfully',
        data: response,
        success: true
    });
})
export { createSponser };
