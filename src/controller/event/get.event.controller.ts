import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Event from '../../model/event.model';


//@desc get all event
//@method GET  /event
//@access private
const getAllEvent = asyncHandler(async (req: Request, res: Response) => {
    const queryParams = req.query
    const query: Record<string, any> = {};
    if (queryParams?.business_id) {
        query.business = queryParams?.business_id
    }
    console.log("queryParams",queryParams)
    const items = await Event.find(query)
    res.json({
        success: true,
        data: items,


    })
})

export { getAllEvent };
