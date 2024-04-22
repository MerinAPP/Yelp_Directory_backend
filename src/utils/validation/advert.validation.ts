import { TypeOf, object, string, z } from "zod";


export const createAdvertSchema = object({
    body: object({
        name: string({ required_error: "Should have name" }).min(1, { message: 'name should have at least 1 character' }),
        desc: string({ required_error: "Should have description" }).min(1, { message: 'description should have at least 1 character' }),

    })
});
export const updateAdvertSchema = object({
    body: object({
        name: string().optional(),
        desc: (string()).optional(),
    }),
    params: object({
        advert_id: string()
    })

});
export const deleteAdvertSchema = object({
    params: object({
        advert_id: string()
    })

});
export const getAdvertSchema = z.object({
    query: z.object({
        page: z.string().regex(/^\d+$/).optional(),
        limit: z.string().regex(/^\d+$/).optional(),
        sortBy: z.string().optional(),
        sortOrder: z.enum(['asc', 'desc']).optional(),
    })

});
export type createAdvertInput = TypeOf<typeof createAdvertSchema>["body"];
export type getAdvertInput = TypeOf<typeof getAdvertSchema>["query"];
export type updateAdvertInput = TypeOf<typeof updateAdvertSchema>["body"];


