import { Request, Response } from 'express';
import businessModel from '../../model/bussiness.model'
import asyncHandler from 'express-async-handler';
import requestModel from '../../model/request.model';
import sponserModel from '../../model/sponser';
import { getSponserInput } from '../../utils/validation/sponser.validation';


//@desc get all sponsers
//@method GET  /sponsers
//@access private
const getAllSponsers = asyncHandler(async (req: Request, res: Response) => {
    const items = await sponserModel.find()
    res.json({
        success: true,
        data: items,
    })
})

export { getAllSponsers };
