
import { z } from 'zod'


export const CreateLanguageDto = z.object({
    name: z.string(),
})


export type CreateLanguageDto = z.infer<typeof CreateLanguageDto>