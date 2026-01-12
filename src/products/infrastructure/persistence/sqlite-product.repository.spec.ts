import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SqliteProductRepository } from './sqlite-product.repository';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import * as fs from 'fs/promises';

jest.mock('fs/promises');

describe('SqliteProductRepository', () => {
    let repository: SqliteProductRepository;
    let typeOrmRepository: Repository<ProductEntity>;

    const mockProductEntity: ProductEntity = {
        id: 'MLA1',
        title: 'Test Product',
        price: { currency: 'ARS', amount: 100, decimals: 0 },
        pictures: ['url'],
        condition: 'new',
        free_shipping: true,
        sold_quantity: 1,
        description: 'desc',
        permalink: 'http://permalink.url',
        attributes: [{ id: '1', name: 'attr', value_name: 'val' }],
        city: 'BsAs',
    };

    const mockRepo = {
        count: jest.fn(),
        create: jest.fn(),
        save: jest.fn(),
        findOne: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                SqliteProductRepository,
                {
                    provide: getRepositoryToken(ProductEntity),
                    useValue: mockRepo,
                },
            ],
        }).compile();

        repository = module.get<SqliteProductRepository>(SqliteProductRepository);
        typeOrmRepository = module.get<Repository<ProductEntity>>(getRepositoryToken(ProductEntity));
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(repository).toBeDefined();
    });

    describe('onModuleInit', () => {
        it('should seed data if database is empty', async () => {
            mockRepo.count.mockResolvedValue(0);
            (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify([mockProductEntity]));
            mockRepo.create.mockReturnValue(mockProductEntity);

            await repository.onModuleInit();

            expect(mockRepo.save).toHaveBeenCalled();
        });

        it('should not seed if database is not empty', async () => {
            mockRepo.count.mockResolvedValue(1);
            await repository.onModuleInit();
            expect(mockRepo.save).not.toHaveBeenCalled();
        });
    });

    describe('findById', () => {
        it('should return a product when found', async () => {
            mockRepo.findOne.mockResolvedValue(mockProductEntity);
            const result = await repository.findById('MLA1');
            expect(result).toBeDefined();
            expect(result.id).toBe('MLA1');
        });

        it('should return null when not found', async () => {
            mockRepo.findOne.mockResolvedValue(null);
            const result = await repository.findById('MLA999');
            expect(result).toBeNull();
        });
    });
});
