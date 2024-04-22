import Category from "../../model/category.model";
import translationSchema from "../../model/translationSchema";
import { findTodaysHit } from "./business.db";

export const findUserBasedCategories = async (userInterset: string[], userId: string, language: string) => {
    const userCustomizedCategory = await Category.find({ 'subcategories.name': { $in: userInterset ?? [] }, })
    const excludedIds = userCustomizedCategory.map(c => c._id)
    const allCategoriesExcept = await Category.find({ _id: { $nin: excludedIds } });
    const all = [...userCustomizedCategory, ...allCategoriesExcept]
    const todayTopBusinesses = await findTodaysHit()
    let final_b;
    if (language != 'English') {
        const ids = todayTopBusinesses?.map(b => b?._id)
        const translated_b = await translationSchema.find({ businessId: { $in: ids }, })
            .select(language)
            .populate({
                path: `${language}.reviews.userId`,
                select: 'firstName avater lastName',
            })
            .lean()
        const transformedBusinesses = translated_b?.map(business => ({
            _id: business.businessId,
            ...business[language],
        }));
        if (transformedBusinesses?.length) {
            final_b = transformedBusinesses
        }
        else {
            final_b = todayTopBusinesses
        }
    } else {
        final_b = todayTopBusinesses
    }
    return { all, todayTopBusinesses: final_b }
}