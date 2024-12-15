import { Injectable } from '@nestjs/common';
;

import { DatabaseService } from 'src/database/database.service';
import { AddProductTranslationDto, CreateProductDto } from './dto';
import { LanguageService } from 'src/language/language.service';


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


            const result = translation.map(async (translation) => {
                const language = await this.language.findOne(translation.languageId)
                if (!language) {
                    return
                }
                return await this.database.translation.create({
                    data: {
                        name: translation.name,
                        description: translation.description,
                        productId: productId,
                        languageId: translation.languageId,
                    },
                })
            })

            return translation

        }
        catch (error) {
            throw new Error("Cannot create this product")
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