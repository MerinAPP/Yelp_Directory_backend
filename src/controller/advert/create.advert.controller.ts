import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IUserMessage } from '../../middleware/authJWT';
import { createSponserInput } from '../../utils/validation/sponser.validation';
import { loop } from '../../utils/help';
import advert from '../../model/advert';
import IAdvert from '../../interfaces/advert.interface';
import { uploadFileToSpaces } from '../../config/spaces';



//@desc create  sponser
//@method POST  /sponser
//@access private
const createAdvert = asyncHandler(async (req: IUserMessage<{}, {}, createSponserInput>, res: Response) => {
    const body = { ...req.body } as Partial<IAdvert>
    if (req?.file) {
        const url = await uploadFileToSpaces(req.file);
        body.coverImage = {
            public_id: url.Key,
            url: url.Location
        };
    }
    const response = await advert.create(body)
    res.status(201).json({
        message: 'Advert created sucessfully',
        data: response,
        success: true
    });
})
export { createAdvert };
