import { Test, TestingModule } from '@nestjs/testing';
import { GetProductDetailHandler } from './get-product-detail.handler';
import { PRODUCT_REPOSITORY } from '../domain/product.repository.interface';
import { Product, Price } from '../domain/product.model';
import { NotFoundException } from '@nestjs/common';

const mockProduct = new Product(
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

describe('GetProductDetailHandler', () => {
    let handler: GetProductDetailHandler;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GetProductDetailHandler,
                {
                    provide: PRODUCT_REPOSITORY,
                    useValue: mockRepository,
                },
            ],
        }).compile();

        handler = module.get<GetProductDetailHandler>(GetProductDetailHandler);
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(handler).toBeDefined();
    });

    describe('execute', () => {
        it('should return a product if found', async () => {
            mockRepository.findById.mockResolvedValue(mockProduct);
            const result = await handler.execute('123');
            expect(result).toBe(mockProduct);
            expect(mockRepository.findById).toHaveBeenCalledWith('123');
        });

        it('should throw NotFoundException if product not found', async () => {
            mockRepository.findById.mockResolvedValue(null);
            await expect(handler.execute('999')).rejects.toThrow(NotFoundException);
        });
    });
});
