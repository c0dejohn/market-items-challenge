import { Product, Price, Attribute } from './product.model';

describe('Domain Models', () => {
    describe('Price', () => {
        it('should create a Price instance', () => {
            const price = new Price('COP', 1000, 0);
            expect(price.currency).toBe('COP');
            expect(price.amount).toBe(1000);
            expect(price.decimals).toBe(0);
        });
    });

    describe('Attribute', () => {
        it('should create an Attribute instance', () => {
            const attr = new Attribute('BRAND', 'Marca', 'Sony');
            expect(attr.id).toBe('BRAND');
            expect(attr.name).toBe('Marca');
            expect(attr.value_name).toBe('Sony');
        });
    });

    describe('Product', () => {
        it('should create a Product instance with all fields', () => {
            const price = new Price('COP', 1000, 0);
            const attr = new Attribute('BRAND', 'Marca', 'Sony');
            const product = new Product(
                '123',
                'Title',
                price,
                ['img1.jpg'],
                'new',
                true,
                10,
                'description',
                'http://permalink',
                [attr],
                'Bogota'
            );

            expect(product.id).toBe('123');
            expect(product.pictures).toEqual(['img1.jpg']);
            expect(product.attributes).toHaveLength(1);
            expect(product.attributes[0]).toBeInstanceOf(Attribute);
        });
    });
});
