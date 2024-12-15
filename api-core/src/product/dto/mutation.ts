

import { z } from 'zod'



export const CreateProductDto = z.object({
    name: z.string(),
    description: z.string(),
    translation: z.array(z.object({
        productId: z.string(),
        name: z.string(),
        description: z.string(),
        slug: z.string().optional(),
        languageId: z.string(),
    })).optional(),
})

export const AddProductTranslationDto = CreateProductDto.pick({
    translation: true
})




export type AddProductTranslationDto = z.infer<typeof AddProductTranslationDto>
export type CreateProductDto = z.infer<typeof CreateProductDto>