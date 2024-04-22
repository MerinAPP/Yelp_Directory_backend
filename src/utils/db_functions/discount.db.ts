import bussinessModel from "../../model/bussiness.model";
import Discount from "../../model/discount.model";


export const getDiscount = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const discount = await Discount.find({
        endDate: { $gt: today }
    }).lean()
    const discountsWithBusiness = await Promise.all(discount.map(async (dis) => {
        const bid = dis?.business;
        const business = await bussinessModel.findById(bid)
            .populate({
                path: 'reviews.userId',
                select: 'firstName avater lastName',
            });
        if (business) {
            return { ...dis, business };
        }
        return dis;
    }));

    return discountsWithBusiness;



}