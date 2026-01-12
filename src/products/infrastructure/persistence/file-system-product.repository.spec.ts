import { Test, TestingModule } from '@nestjs/testing';
import { FileSystemProductRepository } from './file-system-product.repository';
import * as fs from 'node:fs/promises';
import { Product } from '../../domain/product.model';

jest.mock('node:fs/promises');

describe('FileSystemProductRepository', () => {
    let repository: FileSystemProductRepository;

    const mockProducts: Product[] = [
        {
            id: 'MLA1',
            title: 'Test Product',
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
            providers: [FileSystemProductRepository],
        }).compile();

        repository = module.get<FileSystemProductRepository>(FileSystemProductRepository);
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(repository).toBeDefined();
    });

    describe('findById', () => {
        it('should return a product when found', async () => {
            (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockProducts));

            const result = await repository.findById('MLA1');
            expect(result).toEqual(mockProducts[0]);
            expect(fs.readFile).toHaveBeenCalled();
        });

        it('should return null when product is not found', async () => {
            (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockProducts));

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
