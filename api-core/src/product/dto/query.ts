
import { z } from 'zod'



export const GetProductSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
})