import { TypeOf, array, string, z } from "zod";

export const createCategorySchema = z.object({
    body: z.object({
        name: string(),
    }),
});
export const createSubCategorySchema = z.object({
    params: z.object({
        category_id: string(),
    }),
    body: z.object({
        name: string(),
    }),
});
export const createSubCategoryItemSchema = z.object({
    params: z.object({
        category_id: string(),
        subCategory_id: string(),
    }),
    body: z.object({
        name: string(),
    }),
});





export const deleteCategorySchema = z.object({
    params: z.object({
        category_id: string(),
    }),

});
export const deleteSubCategorySchema = z.object({
    params: z.object({
        category_id: string(),
        subCategory_id: string(),
    }),

});
export const deleteSubCategoryItemSchema = z.object({
    params: z.object({
        category_id: string(),
        subCategory_id: string(),
        item_id: string()
    }),

});





export const UpdateCategorySchema = z.object({
    params: z.object({
        category_id: string(),
    }),
    body: z.object({
        name: string(),
    }),
});
export const updateSubSchema = z.object({
    params: z.object({
        category_id: string(),
        subCategory_id: string(),
    }),
    body: z.object({
        name: string(),
    }),
});
export const getCategorySchema = z.object({
    query: z.object({
        page: z.string().regex(/^\d+$/).optional(),
        limit: z.string().regex(/^\d+$/).optional(),
        sortBy: z.string().optional(),
        sortOrder: z.enum(['asc', 'desc']).optional(),
        search: z.string().optional(),
    })

});
export type createCategoryInput = TypeOf<typeof createCategorySchema>["body"];
export type createSubCategoryInput = TypeOf<typeof createSubCategorySchema>["body"];
export type updateSubCategoryInput = TypeOf<typeof UpdateCategorySchema>["body"];
export type updateSubType = TypeOf<typeof updateSubSchema>["body"];
export type getCategoryInput = TypeOf<typeof getCategorySchema>["query"];




