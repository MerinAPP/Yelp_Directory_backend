import bussinessModel from "../../model/bussiness.model";
import Event from "../../model/event.model";

export function getCurrentWeekDates() {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Start of current week (Sunday)
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (6 - today.getDay())); // End of current week (Saturday)
    return { startOfWeek, endOfWeek };
}

export const getEventOfWeek = async () => {
    const { startOfWeek, endOfWeek } = getCurrentWeekDates();
    const eventsOfWeek = await Event.find({
        date: {
            $gte: startOfWeek,
            $lt: endOfWeek
        }
    }).lean()
    const eventsOfWeekWithBusiness = await Promise.all(eventsOfWeek.map(async (dis) => {
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

    return eventsOfWeekWithBusiness;
}