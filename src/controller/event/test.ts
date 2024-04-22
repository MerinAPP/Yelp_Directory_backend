import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Event from '../../model/event.model';
import { getEventOfWeek } from '../../utils/db_functions/event.db';
import { getDiscount } from '../../utils/db_functions/discount.db';


//@desc get all event
//@method GET  /event
//@access private
const getWeekEvent = asyncHandler(async (req: Request, res: Response) => {

    const items = await getDiscount()
    console.log(items)
    res.json({
        success: true,
        data: items,


    })
})

export { getWeekEvent };
