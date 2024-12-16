
import { z } from 'zod'



// Schema-Based Validation with Zod
// use advanced or reusable validation logic (like nested objects or arrays), 
// I will use Zod lib to validate data at the service /controller level.


export const GetProductSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
})

export const TranslationSchema = z.object({
    id: z.string(),
    name: z.string(),
    slug: z.string().optional(),
    description: z.string(),
    languageId: z.string(),
    productId: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const ExtendedProductSchema = GetProductSchema.extend({
    createdAt: z.date(),
    updatedAt: z.date(),
    Translation: z.array(TranslationSchema),
});


export const GetProductsWithPagination = z.object({
    products: z.array(ExtendedProductSchema),
    meta: z.object({
        page: z.number().min(1),
        limit: z.number().min(1),
        total: z.number().nonnegative(),
        totalPages: z.number().nonnegative(),
    }),
});





export const SearchProductDto = z.object({
    query: z.string().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
})


export type GetProductsWithPagination = z.infer<typeof GetProductsWithPagination>

export type SearchProductDto = z.infer<typeof SearchProductDto>

