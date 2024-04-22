import { Response, Request } from 'express';
import asyncHandler from 'express-async-handler';
import subscriptionModel from '../../model/subscription.model';
import NotFoundError from '../../errors/notFound.errors';
import BadRequestError from '../../errors/badRequest.errors';
import { IRequestBodyOfSantim } from '../../interfaces/santim-payload.interface';
import { pricing } from '../../utils/constant';



const webhook = asyncHandler(async (req: Request, res: Response) => {

    const body: IRequestBodyOfSantim = req.body
    const subsciption = await subscriptionModel.findOne({ textRef: body.txnId })
    if (!subsciption) throw new NotFoundError("Subscription wasnot found")
    if (pricing[subsciption?.subscriptionType] != +body?.amount)
        throw new BadRequestError("Cannot complete payment!")
    if (body.status === "COMPLETED") {
        subsciption.status = "APPROVED";
        subsciption.previosSubscriptionType = subsciption.subscriptionType
        const pre = new Date();
        const expirationDate = new Date(pre.getFullYear() + 1, pre.getMonth(), pre.getDate());
        subsciption.expired = expirationDate;
    }
    else {
        subsciption.subscriptionType = subsciption.previosSubscriptionType
        subsciption.status = "APPROVED"
    }
    await subsciption.save()
    res.status(200).json({
        message: 'Payment is approved!',
        success: true
    });
})
export { webhook };



