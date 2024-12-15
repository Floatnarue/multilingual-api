


import { z } from 'zod'


export const GetLanguageDto = z.object({
    id: z.string(),
    name: z.string(),
})


export type GetLanguageDto = z.infer<typeof GetLanguageDto>