import { FilterQuery } from "mongoose";
import bussinessModel from "../../model/bussiness.model";
import { IBusiness } from "../../interfaces/business.interface";
import { getDistFrom2Loc, sortBuble } from "../location";

export const findUserBasedBusienss = async (userInterset: string[], userId: string, query: FilterQuery<IBusiness>,) => {
    const userCustomizedbusienss = await bussinessModel.find({ categories: { $in: userInterset ?? [] }, ...query, status: "APPROVED" })
        .populate({
            path: 'reviews.userId',
            select: 'firstName avater lastName',
        })
    const todayTopBusinesses = await findTodaysHit()
    const sponser = await findSponser()
    return { todayTopBusinesses, userCustomizedbusienss, sponser }

}

export const findTodaysHit = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTopBusinesses = await bussinessModel.aggregate([
        {
            $match: {
                $or: [
                    { 'reviews.createdAt': { $gte: today } },
                    { 'likes.createdAt': { $gte: today } },
                ],
            },
        },
        {
            $addFields: {
                reviewCount: {
                    $size: {
                        $filter: {
                            input: '$reviews',
                            cond: { $gte: ['$$this.createdAt', today] },
                        },
                    },
                },
                likeCount: {
                    $size: {
                        $filter: {
                            input: '$likes',
                            cond: { $gte: ['$$this.createdAt', today] },
                        },
                    },
                },
                reviewUserId: '$reviews.userId',
                reviewUserInfo: { $arrayElemAt: ['$reviewUser', 0] },
            },

        },
        {
            $addFields: {
                totalHits: { $add: ['$reviewCount', '$likeCount'] },
            },
        },

        {
            $sort: { totalHits: -1 },
            // $sort: { reviewCount: -1 },

        },
    ]);
    const id = todayTopBusinesses.map(b => b._id)
    const todaysHitBusiness = await bussinessModel.find({ _id: { $in: id } }).populate({
        path: 'reviews.userId',
        select: 'firstName avater lastName',
    });
    return todaysHitBusiness
}
export const findSponser = async () => {
    const sponserBusiness = await bussinessModel.find({ isSponser: true }).populate({
        path: 'reviews.userId',
        select: 'firstName avater lastName',
    });
    return sponserBusiness
}



export const findNearBusiness = async ({ lat, long, query }: { lat: number, long: number, query: FilterQuery<IBusiness> }) => {
    const busiensses = await bussinessModel.find({ ...query, status: "APPROVED" })
        .populate({
            path: 'reviews.userId',
            select: 'firstName avater lastName',
        }).select('-contact -likes').select('_id branch').lean().exec()
    let businessesWithLength = []
    busiensses.forEach(busienss => {
        const businessWithLength = busienss?.branch.map(b => {
            const distance = getDistFrom2Loc(b.mapLink[0], b.mapLink[1], lat, long)
            if (distance < 1000)
                return { distance, busienss }
        })
        businessesWithLength = [...businessesWithLength, ...businessWithLength]
    })
    return sortBuble(businessesWithLength)

}