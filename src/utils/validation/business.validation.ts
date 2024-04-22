import { array, number, object, string, z } from 'zod';


const validDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
const validStatus = ['PENDING', 'APPROVED', "REJECTED"] as const;


const ProductSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    category: z.string().optional(),
    price: z.number().optional(),
});

const BranchSchema = z.object({
    name: z.string(),
    email: z.string().email({ message: 'Invalid email address' }).optional(),
    phone: z.string().optional(),
    mapLink: z.array(number()).optional(),
    location: string().optional()
});

const HourSchema = z.object({
    day: z.enum(validDays).refine((value) => validDays.includes(value), {
        message: 'Invalid day of the week',
    }),
    start: z.string().optional(),
    end: z.string().optional(),
    dayOff: z.boolean().optional(),
});

const CreateBusinessSchema = z.object({
    body: z.object({
        name: z.string({ required_error: 'Name is required' }),
        email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email address' }),
        phoneNumber: z.string({ required_error: 'Phone number is required' }),
        facebook: z.string().optional(),
        instagram: z.string().optional(),
        telegram: z.string().optional(),
        x: z.string().optional(),
        linkedin: z.string().optional(),
        website: z.string().optional(),
        slogan: z.string().optional(),
        desc: z.string().optional(),
        minPrice: z.number().optional(),
        categories: z.array(z.string()).optional(),
        products: z.array(ProductSchema).optional(),
        hour: z.array(HourSchema).optional(),
        branch: z.array(BranchSchema).optional(),

    })
});
const UpdateBusinessSchema = z.object({
    body: z.object({
        name: z.string().optional(),
        email: z.string().email({ message: 'Invalid email address' }).optional(),
        phoneNumber: z.string().optional(),
        facebook: z.string().optional(),
        instagram: z.string().optional(),
        telegram: z.string().optional(),
        x: z.string().optional(),
        linkedin: z.string().optional(),
        desc: z.string().optional(),
        website: z.string().optional(),
        slogan: z.string().optional(),
        location: z.string().optional(),
        minPrice: z.string().optional(),
        tinNumber: z.string().optional(),
        accountNumber: z.string().optional(),
        categories: z.array(z.string()).optional(),
        items: z.array(z.string()).optional(),
        products: z.array(ProductSchema).optional(),
        hour: z.array(HourSchema).optional(),
        branch: z.array(BranchSchema).optional(),
        removeImages: z.string().optional()
    }),
    params: z.object({
        business_id: string(),
    }),
});
const changeBusinessStatusSchema = z.object({
    body: z.object({
        status: z.enum(validStatus).refine((value) => validStatus.includes(value), {
            message: 'Invalid Status',
        }),
    }),
    params: z.object({
        business_id: string(),
    }),
});

const getBusinessSchema = z.object({
    query: z.object({
        page: z.string().regex(/^\d+$/).optional(),
        limit: z.string().regex(/^\d+$/).optional(),
        sortBy: z.string().optional(),
        sortOrder: z.enum(['asc', 'desc']).optional(),
        search: z.string().optional(),
        categories: z.string().optional(),
        hit: z.string().optional(),
        minPrice: z.string().optional(),
        mainCategory: z.string().optional(),
        location: z.string().optional(),
        language: z.string().optional(),
        status: z.enum(validStatus).refine((value) => validStatus.includes(value), {
            message: 'Invalid Status',
        }).optional(),
    })
});



const getProducts = z.object({
    query: z.object({
        search: z.string().optional(),
        categories: z.string().optional(),
        minPrice: z.string().optional(),
        sortBy: z.string().optional(),
        sortOrder: z.enum(['asc', 'desc']).optional(),
    }),
    params: z.object({
        business_id: string(),
    }),
});




const getSingleBusinessSchema = z.object({
    params: z.object({
        business_id: string(),
    }),
});
const deleteBusinessSchema = z.object({
    params: z.object({
        business_id: string(),
    }),
});

const giveReviewSchema = z.object({
    params: z.object({
        business_id: string(),
    }),
    body: z.object({
        rating: z.number().min(1).max(5),
        comment: z.string().optional()
    }),
});
const createContactMessaggeSchema = z.object({
    params: z.object({
        business_id: string(),
    }),
    body: z.object({
        name: z.string(),
        email: z.string().email({ message: "Invalid email" }),
        phoneNumber: z.string().optional(),
        message: z.string()

    }),
});
const replySchema = z.object({
    params: z.object({
        business_id: string(),
        review_id: string(),
    }),
    body: z.object({
        reply: z.string({ required_error: "what" })
    }),
});
const reactToReviewSchema = z.object({
    params: z.object({
        business_id: string(),
        review_id: string(),
    }),
});
const updateBranchSchema = z.object({
    params: z.object({
        business_id: string(),
        branch_id: string(),
    }),
    body: z.object({
        name: string().optional(),
        email: z.string().email({ message: "Invalid email" }).optional(),
        phone: string().optional(),
        mapLink: z.array(string()).optional(),
        location: string().optional()
    }),
});
const updateProductSchema = z.object({
    params: z.object({
        business_id: string(),
        product_id: string(),
    }),
    body: z.object({
        name: string().optional(),
        email: z.string().email({ message: "Invalid email" }).optional(),
        description: string().optional(),
        price: string().optional(),
        category: z.any()
    }),
});
const createBranchSchema = z.object({
    params: z.object({
        business_id: string(),
    }),
    body: z.object({
        name: string(),
        email: z.string().email({ message: "Invalid email" }).optional(),
        phone: string().optional(),
        mapLink: z.array(string()).optional(),
        location: string().optional()
    }),
});
const createProductSchema = z.object({
    params: z.object({
        business_id: string({ required_error: "business id required" }),
    }),
    body: z.object({
        name: string(),
        description: string().optional(),
        price: string().optional(),
        category: z.any().optional()
    }),
});
const deleteProductSchema = z.object({
    params: z.object({
        business_id: string(),
        product_id: string(),
    }),
});
const deleteBranchSchema = z.object({
    params: z.object({
        business_id: string(),
        branch_id: string(),
    }),

});
const changeBusinessSponserSchema = object({
    body: z.object({
        sponser: z.boolean()
    }),
    params: z.object({
        business_id: string(),
    }),
})

export {
    ProductSchema, BranchSchema,
    HourSchema, CreateBusinessSchema,
    UpdateBusinessSchema, changeBusinessStatusSchema,
    getBusinessSchema, getSingleBusinessSchema,
    createContactMessaggeSchema, giveReviewSchema,
    replySchema, deleteBusinessSchema,
    createProductSchema, createBranchSchema,
    updateProductSchema, updateBranchSchema,
    deleteBranchSchema, deleteProductSchema,
    changeBusinessSponserSchema, reactToReviewSchema
};
export type createBusinessInput = z.TypeOf<typeof CreateBusinessSchema>["body"];
export type updateBusinessInput = z.TypeOf<typeof UpdateBusinessSchema>["body"];
export type changeBusinessStatusInput = z.TypeOf<typeof changeBusinessStatusSchema>["body"];
export type getBusinessInput = z.TypeOf<typeof getBusinessSchema>["query"];
export type giveReviewInput = z.TypeOf<typeof giveReviewSchema>["body"];
export type createContactMessageInput = z.TypeOf<typeof createContactMessaggeSchema>["body"];
export type replyInput = z.TypeOf<typeof replySchema>["body"];


export type createProductInput = z.TypeOf<typeof createProductSchema>["body"];
export type createBranchInput = z.TypeOf<typeof createBranchSchema>["body"];
export type updateBranchInput = z.TypeOf<typeof updateBranchSchema>["body"];
export type updateProductInput = z.TypeOf<typeof updateProductSchema>["body"];
export type getProductsInput = z.TypeOf<typeof getProducts>["query"];



export type changeBusinessSponserInput = z.TypeOf<typeof changeBusinessSponserSchema>["body"];






