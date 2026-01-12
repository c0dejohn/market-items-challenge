import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD, APP_FILTER } from '@nestjs/core';
import { ProductsModule } from './products/products.module';
import { ProductEntity } from './products/infrastructure/persistence/entities/product.entity';
import { ApiKeyGuard } from './common/guards/api-key.guard';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

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
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter,
        },
    ],
})
export class AppModule { }
