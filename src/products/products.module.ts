import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { ProductController } from './infrastructure/http/product.controller';
import { GetProductDetailHandler } from './application/get-product-detail.handler';
import { SqliteProductRepository } from './infrastructure/persistence/sqlite-product.repository';
import { ProductEntity } from './infrastructure/persistence/entities/product.entity';
import { PRODUCT_REPOSITORY } from './domain/product.repository.interface';

@Module({
    imports: [
        CacheModule.register(),
        TypeOrmModule.forFeature([ProductEntity]),
    ],
    controllers: [ProductController],
    providers: [
        GetProductDetailHandler,
        {
            provide: PRODUCT_REPOSITORY,
            useClass: SqliteProductRepository,
        },
    ],
})
export class ProductsModule { }
