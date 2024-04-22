import { TypeOf, object, string, z } from "zod";

export const createEventSchema = object({
    body: object({
        title: string({ required_error: "Should have title" }).min(1, { message: 'Title should have at least 1 character' }),
        description: string({ required_error: "Should have description" }).min(1, { message: 'description should have at least 1 character' }),
        date: z.string(),
        price: z.string().optional(),
        location: z.string({ required_error: "Should have location" }),
        business: z.string({ required_error: "Should have Business id" })
    })
});
export const updateEventSchema = object({
    body: object({
        title: string({ required_error: "Should have title" }).optional(),
        description: string({ required_error: "Should have description" }).optional(),
        date: z.string().optional(),
        price: z.string().optional(),
        location: z.string({ required_error: "Should have location" }).optional(),
        business: z.string({ required_error: "Should have Business id" }).optional()
    }),
    params: object({
        event_id: string()
    })

});
export const deleteEventSchema = object({
    params: object({
        event_id: string()
    })

});

export type createEventInput = TypeOf<typeof createEventSchema>["body"];
export type updateEventInput = TypeOf<typeof updateEventSchema>["body"];


