import { Injectable } from '@nestjs/common';
;

import { DatabaseService } from 'src/database/database.service';
import { AddProductTranslationDto, CreateProductDto, GetProductsWithPagination } from './dto';
import { LanguageService } from 'src/language/language.service';
import { Prisma, Product } from '@prisma/client';


@Injectable()
export class ProductService {
    constructor(private database: DatabaseService,
        private language: LanguageService,
    ) { }
    async createOne(payload: CreateProductDto) {
        try {
            const product = await this.database.product.create({
                data: {
                    name: payload.name,
                    description: payload.description,
                },
            });

            // Handle translation logic
            if (payload.translation && payload.translation.length > 0) {
                try {
                    await this.addProductTranslation(product.id, payload);
                } catch (error) {
                    console.error("Error adding product translations:", error);
                }
            }

            return product;
        } catch (error) {
            console.error("Error creating product:", error);
            throw new Error("Cannot create this product");
        }
    }


    async addProductTranslation(productId: string, payload: AddProductTranslationDto) {
        const product = await this.database.product.findUnique({
            where: {
                id: productId,
            },
        })
        if (!product) {
            throw new Error("Cannot find this product")
        }

        const { translation } = payload

        try {
            const translationResults = await Promise.all(
                translation.map(async (trans) => {
                    const language = await this.language.findOne(trans.languageId);
                    if (!language) {
                        throw new Error(`Language with ID ${trans.languageId} not found`);
                    }
                    return this.database.translation.create({
                        data: {
                            name: trans.name,
                            description: trans.description,
                            productId: productId,
                            languageId: trans.languageId,
                        },
                    });
                })
            );
            return translationResults

        }
        catch (error) {
            throw new Error("Cannot create this product")
        }
    }

    async searchProducts(params: {
        query?: string;
        page?: number;
        limit?: number;
    }): Promise<GetProductsWithPagination> {
        const { query, page = 1, limit = 10 } = params;

        const pageNumber = typeof page === 'string' ? parseInt(page, 10) : page;
        const limitNumber = typeof limit === 'string' ? parseInt(limit, 10) : limit;


        try {

            const skip = (pageNumber - 1) * limitNumber;
            const searchCondition: Prisma.ProductWhereInput = query
                ? {
                    OR: [
                        { name: { contains: query, mode: 'insensitive' } },
                        {
                            Translation: {
                                some: {
                                    OR: [
                                        { name: { contains: query, mode: 'insensitive' } },
                                        { description: { contains: query, mode: 'insensitive' } }
                                    ]
                                }
                            }
                        }
                    ]
                }
                : {};


            const products = await this.database.product.findMany({
                where: searchCondition,
                include: {
                    Translation: true
                },
                skip,
                take: limitNumber,
                orderBy: {
                    createdAt: 'desc'
                }
            });

            console.log('products', products)

            // Count total matching products
            const total = await this.database.product.count({
                where: searchCondition
            });

            return {
                products,
                meta: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limitNumber)
                }
            };
        } catch (error) {
            throw new Error(`Search failed: ${error}`);
        }
    }


    async findOne(id: string) {
        try {
            const product = await this.database.product.findUnique({
                where: {
                    id: id,
                },
            })
            if (!product) {
                throw new Error("Cannot find this product")
            }
            return product
        }
        catch (error) {
            throw new Error("Cannot find this product")
        }
    }

    async deleteOne(id: string): Promise<Product> {
        try {
            const product = await this.database.product.findUnique({
                where: {
                    id: id,
                },
            })
            if (!product) {
                throw new Error("Cannot find this product")
            }
            await this.database.product.delete({
                where: {
                    id: id,
                },
            })
            return product
        }
        catch (error) {
            throw new Error("Cannot delete this product")
        }
    }


}