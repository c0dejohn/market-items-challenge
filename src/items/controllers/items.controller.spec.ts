import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from '../services/items.service';
import { Item, Price } from '../domain/item.model';

const mockItem = new Item(
    '123',
    'Title',
    new Price('ARS', 100, 0),
    'pic',
    'new',
    true,
    1,
    'desc',
);

const mockService = {
    getItem: jest.fn(),
};

describe('ItemsController', () => {
    let controller: ItemsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ItemsController],
            providers: [
                {
                    provide: ItemsService,
                    useValue: mockService,
                },
            ],
        }).compile();

        controller = module.get<ItemsController>(ItemsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getItem', () => {
        it('should return the item from service', async () => {
            mockService.getItem.mockResolvedValue(mockItem);
            const result = await controller.getItem('123');
            expect(result).toBe(mockItem);
            expect(mockService.getItem).toHaveBeenCalledWith('123');
        });
    });
});
