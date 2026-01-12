import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { GetProductDetailHandler } from '../../application/get-product-detail.handler';
import { Product, Price } from '../../domain/product.model';

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

const mockHandler = {
    execute: jest.fn(),
};

describe('ProductController', () => {
    let controller: ProductController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [
                {
                    provide: GetProductDetailHandler,
                    useValue: mockHandler,
                },
            ],
        }).compile();

        controller = module.get<ProductController>(ProductController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getProduct', () => {
        it('should return the product from handler', async () => {
            mockHandler.execute.mockResolvedValue(mockProduct);
            const result = await controller.getProduct('123');
            expect(result).toBe(mockProduct);
            expect(mockHandler.execute).toHaveBeenCalledWith('123');
        });
    });
});
