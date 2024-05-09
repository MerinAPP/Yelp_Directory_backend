import { Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IUserMessage } from '../../middleware/authJWT';
import subscriptionModel from '../../model/subscription.model';
import SantimpaySdk from '../../config/santim';
import userModel from '../../model/user.model';
import NotFoundError from '../../errors/notFound.errors';
// import { nanoid } from "nanoid";
import { createSubscriptionInput } from '../../utils/validation/subscription.validation';
import { GATEWAY_MERCHANT_ID, PRIVATE_KEY_IN_PEM, cancelRedirectUrl, failureRedirectUrl, notifyUrl, pricing, successRedirectUrl } from '../../utils/constant';
import ISubscription from '../../interfaces/subsciption.interface';
import { formatPhoneNumber } from '../../utils/util';



//@desc create  subsciption
//@method POST  /sposubsciptionnser
//@access private
const createSubsciption = asyncHandler(async (req: IUserMessage<object, object, createSubscriptionInput>, res: Response) => {


    const user = await userModel.findById(req.userData?.userId)
    if (!user) throw new NotFoundError("User not found")

    const client = new SantimpaySdk(GATEWAY_MERCHANT_ID, PRIVATE_KEY_IN_PEM, false);
    const textRef = Math.floor(Math.random() * 1000000000).toString();
    const subscriptionType = req.body.subscriptionType

    const preSub = await subscriptionModel.findOne({ user: user?._id, })
    if (preSub) {
        preSub.subscriptionType = subscriptionType as "Free" | "Standard" | "Premium"
        preSub.status = "PENDING"
        preSub.textRef = textRef
        await preSub.save()
    } else {
        const body = {
            textRef,
            subscriptionType,
            previosSubscriptionType: subscriptionType,
            user: user?._id,
            expired: new Date()
        } as ISubscription
        await subscriptionModel.create(body)
    }
    client
        .generatePaymentUrl(
            textRef,
            pricing[subscriptionType] ?? 3000,
            "subscription",
            successRedirectUrl,
            failureRedirectUrl,
            notifyUrl,
            formatPhoneNumber(user?.phoneNumber),
            cancelRedirectUrl
        )
        .then((url) => {
            res.status(200).json({
                message: 'Payment is processing!',
                data: { url },
                success: true
            });
        })
        .catch((error) => {
            console.log({ error })
            res.status(400).json({
                message: 'Cant process payment!',
                data: { error },
                success: false
            });

        });

})
export { createSubsciption };




