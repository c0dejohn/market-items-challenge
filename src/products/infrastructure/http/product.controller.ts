import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetProductDetailHandler } from '../../application/get-product-detail.handler';
import { Product } from '../../domain/product.model';

@ApiTags('items')
@Controller('items')
export class ProductController {
    constructor(private readonly getProductDetailHandler: GetProductDetailHandler) { }

    @ApiOperation({ summary: 'Get product detail by ID' })
    @ApiResponse({ status: 200, description: 'Return the product.', type: Product })
    @ApiResponse({ status: 404, description: 'Product not found.' })
    @Get(':id')
    async getProduct(@Param('id') id: string): Promise<Product> {
        return this.getProductDetailHandler.execute(id);
    }
}
