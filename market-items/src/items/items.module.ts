import { Module } from '@nestjs/common';
import { ITEMS_REPOSITORY } from './domain/items.repository.interface';
import { JsonFileItemsRepository } from './infrastructure/persistence/json-file-items.repository';
import { ItemsController } from './controllers/items.controller';
import { ItemsService } from './services/items.service';

@Module({
    controllers: [ItemsController],
    providers: [
        ItemsService,
        {
            provide: ITEMS_REPOSITORY,
            useClass: JsonFileItemsRepository,
        },
    ],
    exports: [ITEMS_REPOSITORY],
})
export class ItemsModule { }
