import { TypeOf, string, z } from "zod";

export const deleteAboutSchema = z.object({
    params: z.object({
        aboutId: string(),
    }),

});

export const updateAboutSchema = z.object({
    params: z.object({
        aboutId: string(),
    }),
    body: z.object({
        content: string().optional(),
        title: string().optional(),
    })
});

export const updateFeatureSchema = z.object({
    params: z.object({
        featureId: string(),
    }),
    body: z.object({
        title: string().optional(),
        subTitle: string().optional()
    })
});


export const createBenefitSchema = z.object({
    body: z.object({
        question: string(),
        answer: z.array(string()),
    })
});

export const updateBenefitSchema = z.object({
    body: z.object({
        question: string().optional(),
        answer: z.array(string()).optional(),
    })
});
export const createFeatureSchema = z.object({
    body: z.object({
        title: string(),
        subTitle: string()
    })
});


export const deleteFeatureSchema = z.object({
    params: z.object({
        featureId: string(),
    }),

});

export type updateAboutInput = TypeOf<typeof updateAboutSchema>["body"];
export type createBenefitInput = TypeOf<typeof createBenefitSchema>["body"];
export type updateBenefitInput = TypeOf<typeof updateBenefitSchema>["body"];
export type createFeatureInput = TypeOf<typeof createFeatureSchema>["body"];
export type updateFeatureType = TypeOf<typeof updateFeatureSchema>["body"];
