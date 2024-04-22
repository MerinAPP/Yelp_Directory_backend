import { TypeOf, z, object, string } from "zod";
const validRoles = ['ADMIN', 'SYSTEM_ADMIN'] as const;
const getUsersSchema = z.object({
    query: z.object({
        page: z.string().regex(/^\d+$/).optional(),
        limit: z.string().regex(/^\d+$/).optional(),
        sortBy: z.string().optional(),
        sortOrder: z.enum(['asc', 'desc']).optional(),
        search: z.string().optional(),
        businessId: z.string().optional(),
        role: z.string().optional()
    })

});
const createUserSchema = z.object({
    body: object({
        role: z.enum(validRoles).refine((value) => validRoles.includes(value), {
            message: 'Invalid Roles',
        }),
        firstName: string({ required_error: "Should have first name" }).min(1, { message: 'First name should have at least 1 character' }).max(20, { message: 'First name should have at most 20 characters' }),
        lastName: string({ required_error: "Should have last name" }).min(1, { message: 'Last name should have at least 1 character' }).max(20, { message: 'Last name should have at most 20 characters' }),
        email: string({ required_error: "Should have email" }).email({ message: 'Invalid email address' }),
        phoneNumber: string({ required_error: "Should have phone number" }).min(1, { message: 'Phone number should have at least 1 character' }),
    })
})


const updateUserSchema = z.object({
    body: object({
        firstName: string().min(1, { message: 'First name should have at least 1 character' }).max(20, { message: 'First name should have at most 20 characters' }).optional(),
        lastName: string().min(1, { message: 'Last name should have at least 1 character' }).max(20, { message: 'Last name should have at most 20 characters' }).optional(),
        isActive: z.boolean().optional()
    }),
    params: object({
        id: string()
    })
})

const deleteUserSchema = z.object({
    params: object({
        id: string()
    })
})



export const createUserFavCatSchema = z.object({
    body: object({
        name: string({ required_error: "Should have name" }).min(1, { message: 'Name should have at least 1 character' }).max(20, { message: 'Name should have at most 20 characters' }),

    })
})
export const addToOrRemoveFavCatSchema = z.object({
    body: object({
        busienssId: z.string()
    }),
    params: object({
        favCat_id: string()
    })
})
export const editFavCatSchema = z.object({
    body: object({
        name: z.string()
    }),
    params: object({
        favCat_id: string()
    })
})

export const deleteFavSchema = z.object({
    params: object({
        favCat_id: string()
    })
})




export { getUsersSchema, createUserSchema, updateUserSchema, deleteUserSchema }
export type getUsersInput = TypeOf<typeof getUsersSchema>["query"];
export type createUserInput = TypeOf<typeof createUserSchema>["body"];
export type updateUserInput = TypeOf<typeof updateUserSchema>["body"];
export type createUserFavCatInput = TypeOf<typeof createUserFavCatSchema>["body"];
export type addToFavCatInput = TypeOf<typeof addToOrRemoveFavCatSchema>["body"];
export type editFavCatInput = TypeOf<typeof editFavCatSchema>["body"];



