import { Module } from '@nestjs/common';
import { LanguageModule } from 'src/language/language.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
    imports: [LanguageModule],
    controllers: [ProductController],
    providers: [ProductService],
    exports: [ProductService],
})
export class ProductModule { }
