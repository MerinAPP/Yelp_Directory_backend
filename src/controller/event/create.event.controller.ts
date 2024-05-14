import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IUserMessage } from '../../middleware/authJWT';
import { loop } from '../../utils/help';
import Event from '../../model/event.model';
import { createEventInput } from '../../utils/validation/event.validation';
import { uploadFileToSpaces } from '../../config/spaces'; // Adjust the path accordingly

const createEvent = asyncHandler(async (req: IUserMessage<{}, {}, createEventInput>, res: Response) => {
    const body = { ...req.body } as any
    if (req?.file) {
        const url = await uploadFileToSpaces(req.file);
        body.photo = {
            public_id: url.Key,
            url: url.Location
        };
    }
    console.log({ body })
    body.price = parseFloat(body?.price)
    body.date = new Date(body?.date)
    // body.date = new Date()


    const response = await Event.create(body)
    res.status(201).json({
        message: 'Event created successfully',
        data: response,
        success: true
    });
});


const createEventWithMultipleFiles = asyncHandler(async (req: IUserMessage<{}, {}, createEventInput>, res: Response) => {
    const body = { ...req.body } as any;

    if (req?.files && Array.isArray(req.files)) {
        const fileUploadPromises = req.files.map(file => uploadFileToSpaces(file));
        const uploadResults = await Promise.all(fileUploadPromises);

        body.photos = uploadResults.map(result => ({
            public_id: result.Key,
            url: result.Location
        }));
    }

    console.log({ body });
    body.price = parseFloat(body?.price);
    body.date = new Date();
    const response = await Event.create(body);

    res.status(201).json({
        message: 'Event created successfully',
        data: response,
        success: true
    });
});


export { createEvent, createEventWithMultipleFiles };
