import { Controller, Get, Param } from '@nestjs/common';
import { ItemsService } from '../services/items.service';
import { Item } from '../domain/item.model';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) { }

    @Get(':id')
    async getItem(@Param('id') id: string): Promise<Item> {
        return this.itemsService.getItem(id);
    }
}
