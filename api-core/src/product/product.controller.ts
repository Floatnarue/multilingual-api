import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, SearchProductDto } from './dto';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }
    // Validation input Dto using schema-Based Validation with Zod
    // for more robust validation , we could use Validation pipes to ensure data validation 
    // before the request enter the controller.
    @Post()
    create(@Body() createUserDto: CreateProductDto) {
        return this.productService.createOne(createUserDto);
    }
    @Get()
    async searchProducts(@Query() searchDto: SearchProductDto) {
        return this.productService.searchProducts({
            query: searchDto.query,
            page: searchDto.page,
            limit: searchDto.limit
        });
    }
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productService.deleteOne(id);
    }
}
