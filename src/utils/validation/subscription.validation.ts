import { TypeOf, object, string, z } from "zod";


export const createSubscriptionSchema = object({
    body: object({
        subscriptionType: string({ required_error: "Should have subscription Type" }).min(1, { message: 'name should have at least 1 character' }),

    })
});
export type createSubscriptionInput = TypeOf<typeof createSubscriptionSchema>["body"];