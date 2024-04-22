import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import layoutModel from '../../model/layout.model';


const getLayout = asyncHandler(async (req: Request, res: Response) => {
    const items = await layoutModel.findOne()
    res.json({
        success: true,
        data: items,


    })
})
export { getLayout };
