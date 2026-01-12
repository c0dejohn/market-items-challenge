import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Item } from '../domain/item.model';
import {
    ITEMS_REPOSITORY,
    ItemsRepository,
} from '../domain/items.repository.interface';

@Injectable()
export class ItemsService {
    constructor(
        @Inject(ITEMS_REPOSITORY)
        private readonly itemsRepository: ItemsRepository,
    ) { }

    async getItem(id: string): Promise<Item> {
        const item = await this.itemsRepository.findById(id);
        if (!item) {
            throw new NotFoundException(`Item with ID ${id} not found`);
        }
        return item;
    }
}
