import { Request, Response } from "express";
import NotFoundError from "../../errors/notFound.errors";
import asyncHandler from "express-async-handler";
import { z } from "zod";
import { loop } from "../../utils/help";
import Event from "../../model/event.model";
import { updateEventInput, updateEventSchema } from "../../utils/validation/event.validation";
import { uploadFileToSpaces } from "../../config/spaces";




//@desc update event
//@method PATCH  /event/:event_id
//@access private
export const updateEvent = asyncHandler(async (req: Request<z.TypeOf<typeof updateEventSchema>["params"], object, updateEventInput>, res: Response) => {
    const eventId = req.params.event_id
    const event = await Event.findById(eventId)
    if (!event) throw new NotFoundError('Event not found')
    const body = { ...req.body } as any

    if (req?.file) {
        const url = await uploadFileToSpaces(req.file);
        body.photo = {
            public_id: url.Key,
            url: url.Location
        };
    } else {
        body.photo = event?.photo
    }
    if (!body?.photo) {
        body.photo = event.photo
        console.log(body.photo)
    }

    if (body?.price)
        body.price = parseFloat(body?.price)
    if (body?.date)
        body.date = new Date(body?.date)

    const updatedEvent = await Event.findByIdAndUpdate(eventId, { $set: body }, { new: true })
    res.status(200).json({
        message: 'Event Updated sucessfully',
        sucess: true,
        body: updatedEvent
    })
})