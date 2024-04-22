import { TypeOf, object, string, z } from "zod";


export const createSponserSchema = object({
    body: object({
        name: string({ required_error: "Should have name" }).min(1, { message: 'name should have at least 1 character' }),
        categories: z.array(string()).optional(),
        sponsorshipLevel: z.enum(['Gold', 'Silver', 'Bronze']).optional()
    })
});
export const updateSponserSchema = object({
    body: object({
        name: string().optional(),
        categories: z.array(string()).optional(),
        sponsorshipLevel: z.enum(['Gold', 'Silver', 'Bronze']).optional()
    }),
    params: object({
        sponser_id: string()
    })

});
export const deleteSponserSchema = object({
    params: object({
        sponser_id: string()
    })

});
export const getSponserSchema = z.object({
    query: z.object({
        page: z.string().regex(/^\d+$/).optional(),
        limit: z.string().regex(/^\d+$/).optional(),
        sortBy: z.string().optional(),
        sortOrder: z.enum(['asc', 'desc']).optional(),
    })

});
export type createSponserInput = TypeOf<typeof createSponserSchema>["body"];
export type getSponserInput = TypeOf<typeof getSponserSchema>["query"];
export type updateSponserInput = TypeOf<typeof updateSponserSchema>["body"];


