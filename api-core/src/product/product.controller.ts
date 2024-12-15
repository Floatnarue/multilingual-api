import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, SearchProductDto } from './dto';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post()
    create(@Body() createUserDto: CreateProductDto) {
        return this.productService.createOne(createUserDto);
    }
    @Get()
    findAll() {
        // return this.productService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productService.findOne(id);
    }
    @Get('search')
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
