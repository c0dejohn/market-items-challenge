import { Item } from './item.model';

export interface ItemsRepository {
    findById(id: string): Promise<Item | null>;
}

export const ITEMS_REPOSITORY = 'ITEMS_REPOSITORY';
