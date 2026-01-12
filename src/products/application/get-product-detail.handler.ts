import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Product } from '../domain/product.model';
import { PRODUCT_REPOSITORY, ProductRepository } from '../domain/product.repository.interface';

@Injectable()
export class GetProductDetailHandler {
    constructor(
        @Inject(PRODUCT_REPOSITORY)
        private readonly productRepository: ProductRepository,
    ) { }

    async execute(id: string): Promise<Product> {
        const product = await this.productRepository.findById(id);
        if (!product) {
            throw new NotFoundException(`Product with ID "${id}" not found`);
        }
        return product;
    }
}
