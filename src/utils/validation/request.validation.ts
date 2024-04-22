import { TypeOf, object, string, z } from "zod";


const validStatus = ['PENDING', 'APPROVED', "REJECTED"] as const;

export const createRequestSchema = object({
    body: object({
        type: string({ required_error: "Should have type of request" }),
        reviewId: string().optional(),
        businessId: string().optional(),
    })
});
export const updateRequestSchema = object({
    body: object({
        status: z.enum(validStatus).refine((value) => validStatus.includes(value), {
            message: 'Invalid Status',
        }).optional(),
    }),
    params: object({
        request_id: string()
    })

});
export const deleteRequestSchema = object({
    params: object({
        request_id: string()
    })

});
export const getRequestSchema = z.object({
    query: z.object({
        page: z.string().regex(/^\d+$/).optional(),
        limit: z.string().regex(/^\d+$/).optional(),
        sortBy: z.string().optional(),
        sortOrder: z.enum(['asc', 'desc']).optional(),
        type: z.string().optional(),
        status: z.enum(validStatus).refine((value) => validStatus.includes(value), {
            message: 'Invalid Status',
        }).optional(),
    })

});
export type createRequestInput = TypeOf<typeof createRequestSchema>["body"];
export type getRequestInput = TypeOf<typeof getRequestSchema>["query"];
export type updateRequestInput = TypeOf<typeof updateRequestSchema>["body"];


