import asyncHandler from 'express-async-handler';
import { Response } from "express";
import { IUserMessage } from '../../middleware/authJWT';
import NotFoundError from '../../errors/notFound.errors';
import { z } from 'zod';
import Event from '../../model/event.model';
import { deleteEventSchema } from '../../utils/validation/event.validation';


//@desc update event
//@method PATCH  /event/:event_id
//@access private
export const deleteEvent = asyncHandler(async (req: IUserMessage<z.TypeOf<typeof deleteEventSchema>["params"], {}, {}>, res: Response) => {
    const existingEvent = await Event.findById(req.params.event_id)
    if (!existingEvent) throw new NotFoundError("Event not found")
    const deleteEvent = await Event.findByIdAndDelete(req.params.event_id)
    if (deleteEvent)
        res.json({ success: true, message: "Event deleted sucessfully" });
})