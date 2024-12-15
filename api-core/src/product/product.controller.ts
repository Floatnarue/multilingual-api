import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto';

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

    // @Patch(':id')

    // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    //     return this.productService.update(+id, updateUserDto);
    // }
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.productService.deleteOne(id);
    }
}
