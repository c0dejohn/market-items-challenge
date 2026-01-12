import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ProductController } from './infrastructure/http/product.controller';
import { GetProductDetailHandler } from './application/get-product-detail.handler';
import { FileSystemProductRepository } from './infrastructure/persistence/file-system-product.repository';
import { PRODUCT_REPOSITORY } from './domain/product.repository.interface';

@Module({
    imports: [CacheModule.register()],
    controllers: [ProductController],
    providers: [
        GetProductDetailHandler,
        {
            provide: PRODUCT_REPOSITORY,
            useClass: FileSystemProductRepository,
        },
    ],
})
export class ProductsModule { }
