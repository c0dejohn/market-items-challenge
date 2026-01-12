import { Injectable, Logger } from '@nestjs/common';
import { Product } from '../../domain/product.model';
import { ProductRepository } from '../../domain/product.repository.interface';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';

@Injectable()
export class FileSystemProductRepository implements ProductRepository {
    private readonly logger = new Logger(FileSystemProductRepository.name);
    private readonly filePath = path.resolve(process.cwd(), 'data/items.json');

    async findById(id: string): Promise<Product | null> {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            const items: Product[] = JSON.parse(data);
            const product = items.find((i) => i.id === id);
            return product || null;
        } catch (error) {
            this.logger.error(`Error reading products from file: ${error.message}`);
            throw new Error('Database connection failed');
        }
    }
}
