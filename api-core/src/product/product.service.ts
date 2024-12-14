import { Injectable } from '@nestjs/common';
;
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductService {
    constructor(private prisma: DatabaseService) { }

    async findByLanguage(language: string = 'en') {
        const products = await this.prisma.product.findMany();

        return products.map(product => {
            // Fallback logic with language preference
            const getName = (langs: string[]) => {
                for (const lang of langs) {
                    if (product.name[lang]) return product.name[lang];
                }
                return product.name[product.defaultLang] || 'N/A';
            };

            const getDescription = (langs: string[]) => {
                for (const lang of langs) {
                    if (product.description[lang]) return product.description[lang];
                }
                return product.description[product.defaultLang] || 'N/A';
            };

            // Example of language fallback priority
            const languageFallbackChain = [
                language,           // Requested language
                product.defaultLang, // Default language
                'en',               // Fallback to English
                Object.keys(product.name)[0] // First available language
            ];

            return {
                ...product,
                name: getName(languageFallbackChain),
                description: getDescription(languageFallbackChain)
            };
        });
    }

    // Other methods remain the same
}