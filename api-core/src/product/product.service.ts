import { Injectable } from '@nestjs/common';
;

import { DatabaseService } from 'src/database/database.service';
import { AddProductTranslationDto, CreateProductDto } from './dto';
import { LanguageService } from 'src/language/language.service';
import { Prisma } from '@prisma/client';


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
            })
            if (payload.translation || payload.translation.length > 0) {
                await this.addProductTranslation(product.id, payload)
            }
        }
        catch (error) {
            throw new Error("Cannot create this product")
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
    }) {
        const { query, page = 1, limit = 10 } = params;

        try {
            // Calculate pagination
            const skip = (page - 1) * limit;

            // Construct search condition
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

            // Fetch products with translations
            const products = await this.database.product.findMany({
                where: searchCondition,
                include: {
                    Translation: true
                },
                skip,
                take: limit,
                orderBy: {
                    createdAt: 'desc'
                }
            });

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
                    totalPages: Math.ceil(total / limit)
                }
            };
        } catch (error) {
            throw new Error(`Search failed: ${error}`);
        }
    }

    async findAll() {

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

    async deleteOne(id: string) {
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