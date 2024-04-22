import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IUserMessage } from '../../middleware/authJWT';
import sponserModel from '../../model/sponser';
import { createSponserInput } from '../../utils/validation/sponser.validation';
import { loop } from '../../utils/help';
import ISponsor from '../../interfaces/sponser.interface';



//@desc create  sponser
//@method POST  /sponser
//@access private
const createSponser = asyncHandler(async (req: IUserMessage<object, object, createSponserInput>, res: Response) => {
    const body = { ...req.body } as Partial<ISponsor>
    if (req?.files && req?.files.length) {
        const url = await loop(req?.files)
        body.coverImage = {
            public_id: url.id,
            url: url.url
        }
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
