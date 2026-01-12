import { Test, TestingModule } from '@nestjs/testing';
import { JsonFileItemsRepository } from './json-file-items.repository';
import * as fs from 'fs/promises';
import { Item } from '../../domain/item.model';

jest.mock('fs/promises');

describe('JsonFileItemsRepository', () => {
    let repository: JsonFileItemsRepository;

    const mockItems: Item[] = [
        {
            id: 'MLA1',
            title: 'Test Item',
            price: { currency: 'ARS', amount: 100, decimals: 0 },
            pictures: ['url'],
            condition: 'new',
            free_shipping: true,
            sold_quantity: 1,
            description: 'desc',
            permalink: 'http://permalink.url',
            attributes: [],
            city: 'BsAs',
        },
    ];

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [JsonFileItemsRepository],
        }).compile();

        repository = module.get<JsonFileItemsRepository>(JsonFileItemsRepository);
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(repository).toBeDefined();
    });

    describe('findById', () => {
        it('should return an item when found', async () => {
            (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockItems));

            const result = await repository.findById('MLA1');
            expect(result).toEqual(mockItems[0]);
            expect(fs.readFile).toHaveBeenCalled();
        });

        it('should return null when item is not found', async () => {
            (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockItems));

            const result = await repository.findById('MLA999');
            expect(result).toBeNull();
        });

        it('should throw an error when file reading fails', async () => {
            (fs.readFile as jest.Mock).mockRejectedValue(new Error('File error'));

            await expect(repository.findById('MLA1')).rejects.toThrow(
                'Database connection failed',
            );
        });
    });
});
