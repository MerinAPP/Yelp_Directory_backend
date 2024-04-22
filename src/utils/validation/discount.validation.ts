import { TypeOf, object, string, z } from "zod";




export const createDiscountSchema = object({
    body: object({
        description: string({ required_error: "Should have description" }).min(1, { message: 'description should have at least 1 character' }),
        startDate: z.string(),
        endDate: z.string(),
        discountPercentage: z.string().optional(),
        productName: z.string().optional(),
        originalPrice: z.string().optional(),
        business: z.string({ required_error: "Should have Business id" })
    })
});
export const updateDiscountSchema = object({
    body: object({
        description: string({ required_error: "Should have description" }).optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        discountPercentage: z.string().optional(),
        productName: z.string().optional(),
        originalPrice: z.string().optional(),
        business: z.string({ required_error: "Should have Business id" })
    }),
    params: object({
        discount_id: string()
    })

});
export const deleteDiscountSchema = object({
    params: object({
        discount_id: string()
    })

});

export type createDiscountInput = TypeOf<typeof createDiscountSchema>["body"];
export type updateDiscountInput = TypeOf<typeof updateDiscountSchema>["body"];


