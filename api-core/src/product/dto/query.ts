
import { z } from 'zod'



export const GetProductSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
})


export class PaginatedOutputDto<T> {
    data: T[];
    meta: {
        total: number;
        lastPage: number;
        currentPage: number;
        perPage: number;
        prev: number | null;
        next: number | null;
    };
}


export const SearchProductDto = z.object({
    query: z.string().optional(),
    page: z.number().optional(),
    limit: z.number().optional(),
})


export type SearchProductDto = z.infer<typeof SearchProductDto>

