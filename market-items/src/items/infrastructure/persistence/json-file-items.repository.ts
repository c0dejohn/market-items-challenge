import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Item } from '../../domain/item.model';
import { ItemsRepository } from '../../domain/items.repository.interface';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class JsonFileItemsRepository implements ItemsRepository {
    private readonly logger = new Logger(JsonFileItemsRepository.name);
    private readonly filePath = path.resolve(process.cwd(), 'data/items.json');

    async findById(id: string): Promise<Item | null> {
        try {
            const data = await fs.readFile(this.filePath, 'utf8');
            const items: Item[] = JSON.parse(data);
            const item = items.find((i) => i.id === id);
            return item || null;
        } catch (error) {
            this.logger.error(`Error reading items from file: ${error.message}`);
            throw new Error('Database connection failed');
        }
    }
}
