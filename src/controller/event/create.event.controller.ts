import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { IUserMessage } from '../../middleware/authJWT';
import { loop } from '../../utils/help';
import Event from '../../model/event.model';
import { createEventInput } from '../../utils/validation/event.validation';
import { uploadFile } from '../../config/spaces'; // Adjust the path accordingly
import { local_config } from "../../config/config"
import { generateUniqueID } from '../../utils/util';

const createEvent = asyncHandler(async (req: IUserMessage<{}, {}, createEventInput>, res: Response) => {
    const body = { ...req.body } as any
    if (req?.file) {
        const fileName = req.file.filename;
        try {
            await uploadFile(fileName);
            const id = generateUniqueID();
            body.photo = {
                public_id: id,
                url: `${local_config.BUCKET_URL}/${fileName}`
            };
        } catch (error) {
            console.error('Error uploading file:', error);
            throw new Error("Cant upload image")
        }
    }
    console.log({ body })
    body.price = parseFloat(body?.price)
    // body.date = new Date(body?.date)
    body.date = new Date()


    const response = await Event.create(body)
    res.status(201).json({
        message: 'Event created successfully',
        data: response,
        success: true
    });
});


//Incase of multiple upload
// import { Request, Response } from 'express';
// import asyncHandler from 'express-async-handler';
// import { IUserMessage } from '../../middleware/authJWT';
// import { loop } from '../../utils/help';
// import Event from '../../model/event.model';
// import { createEventInput } from '../../utils/validation/event.validation';
// import { uploadFile } from '../../config/spaces'; // Adjust the path accordingly
// import { local_config } from "../../config/config"
// import { generateUniqueID } from "../../utils/constant"

// const createEvent = asyncHandler(async (req: IUserMessage<{}, {}, createEventInput>, res: Response) => {
//     const body = { ...req.body } as any;
//     console.log(req?.files);
//     if (req?.files && req?.files.length) {
//         const urls = await Promise.all(req.files.map(async (file: Express.Multer.File) => {
//             const fileName = file.filename;
//             const id = generateUniqueID();
//             try {
//                 await uploadFile(fileName);
//                 return {
//                     public_id: id,
//                     url: `${local_config.BUCKET_URL}/${fileName}`
//                 };
//             } catch (error) {
//                 console.error('Error uploading file:', error);
//                 // Handle error response here if file upload fails
//                 return null;
//             }
//         }));
//         body.photos = urls.filter(url => url !== null);
//     }
//     console.log({ body })
//     body.price = parseFloat(body?.price)
//     body.date = new Date(body?.date)
//     const response = await Event.create(body)
//     res.status(201).json({
//         message: 'Event created sucessfully',
//         data: response,
//         success: true
//     });
// });

// export { createEvent };
