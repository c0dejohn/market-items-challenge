import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { ProductsModule } from './products/products.module';
import { ProductEntity } from './products/infrastructure/persistence/entities/product.entity';
import { ApiKeyGuard } from './common/guards/api-key.guard';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        TypeOrmModule.forRoot({
            type: 'sqlite',
            database: ':memory:',
            entities: [ProductEntity],
            synchronize: true,
        }),
        ProductsModule,
    ],
    providers: [
        {
            provide: APP_GUARD,
            useClass: ApiKeyGuard,
        },
    ],
})
export class AppModule { }
