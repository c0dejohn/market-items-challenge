import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';
import { ProductRepository } from '../../domain/product.repository.interface';
import { Product } from '../../domain/product.model';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class SqliteProductRepository implements ProductRepository, OnModuleInit {
    private readonly logger = new Logger(SqliteProductRepository.name);
    private readonly seedFilePath = path.resolve(process.cwd(), 'data/items.json');

    constructor(
        @InjectRepository(ProductEntity)
        private readonly repository: Repository<ProductEntity>,
    ) { }

    async onModuleInit() {
        await this.seedData();
    }

    private async seedData() {
        const count = await this.repository.count();
        if (count > 0) {
            this.logger.log('Database already seeded');
            return;
        }

        try {
            this.logger.log('Seeding database from items.json...');
            const data = await fs.readFile(this.seedFilePath, 'utf8');
            const items: Product[] = JSON.parse(data);

            const entities = items.map(item => this.repository.create(item));
            await this.repository.save(entities);
            this.logger.log(`Seeded ${entities.length} products`);
        } catch (error) {
            this.logger.error(`Error seeding database: ${error.message}`);
        }
    }

    async findById(id: string): Promise<Product | null> {
        const entity = await this.repository.findOne({ where: { id } });
        if (!entity) return null;

        // Map Entity to Domain
        return new Product(
            entity.id,
            entity.title,
            entity.price,
            entity.pictures,
            entity.condition,
            entity.free_shipping,
            entity.sold_quantity,
            entity.description,
            entity.permalink,
            entity.attributes.map(attr => ({
                id: attr.id,
                name: attr.name,
                value_name: attr.value_name
            })),
            entity.city
        );
    }
}
