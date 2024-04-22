import { Request, Response } from "express";


const gettranslate = async (req: Request, res: Response) => {
    const lan = 'Amharic'
    const new_busines = await translationSchema.find({ _id: '659871db306d722b72f5a7e1' })
        .select(`${lan} businessId`)
        .populate({
            path: `${lan}.reviews.userId`,
            select: 'firstName avater lastName',
        })
        .lean()
    const transformedBusinesses = new_busines.map(business => ({
        _id: business.businessId,
        ...business[lan],
    }));
    return res.json({ busienss: transformedBusinesses })
}

export {
    gettranslate
};

import express from "express";
import translationSchema from "../model/translationSchema";
const router = express.Router();
router.get("/", gettranslate)
export default router;


