import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { getSponserInput } from '../../utils/validation/sponser.validation';
import advert from '../../model/advert';


//@desc get all adverts
//@method GET  /avert
//@access private
const getAllAdverts = asyncHandler(async (req: Request, res: Response) => {
    const items = await advert.find()
    res.json({
        success: true,
        data: items,

    })
})

export { getAllAdverts };
