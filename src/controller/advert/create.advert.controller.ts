import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IUserMessage } from '../../middleware/authJWT';
import { createSponserInput } from '../../utils/validation/sponser.validation';
import { loop } from '../../utils/help';
import advert from '../../model/advert';
import IAdvert from '../../interfaces/advert.interface';



//@desc create  sponser
//@method POST  /sponser
//@access private
const createAdvert = asyncHandler(async (req: IUserMessage<{}, {}, createSponserInput>, res: Response) => {
    const body = { ...req.body } as Partial<IAdvert>
    if (req?.files && req?.files.length) {
        const url = await loop(req?.files)
        body.coverImage = {
            public_id: url.id,
            url: url.url
        }
    }
    const response = await advert.create(body)
    res.status(201).json({
        message: 'Advert created sucessfully',
        data: response,
        success: true
    });
})
export { createAdvert };
