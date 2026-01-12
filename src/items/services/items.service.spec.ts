import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { ITEMS_REPOSITORY } from '../domain/items.repository.interface';
import { Item, Price } from '../domain/item.model';
import { NotFoundException } from '@nestjs/common';

const mockItem = new Item(
    '123',
    'Title',
    new Price('ARS', 100, 0),
    ['http://picture.url'],
    'new',
    true,
    1,
    'desc',
    'http://permalink.url',
    [],
    'BsAs',
);

const mockRepository = {
    findById: jest.fn(),
};

describe('ItemsService', () => {
    let service: ItemsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ItemsService,
                {
                    provide: ITEMS_REPOSITORY,
                    useValue: mockRepository,
                },
            ],
        }).compile();

        service = module.get<ItemsService>(ItemsService);
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getItem', () => {
        it('should return an item if found', async () => {
            mockRepository.findById.mockResolvedValue(mockItem);
            const result = await service.getItem('123');
            expect(result).toBe(mockItem);
            expect(mockRepository.findById).toHaveBeenCalledWith('123');
        });

        it('should throw NotFoundException if item not found', async () => {
            mockRepository.findById.mockResolvedValue(null);
            await expect(service.getItem('999')).rejects.toThrow(NotFoundException);
        });
    });
});
