import { Item, Price, Attribute } from './item.model';

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

    describe('Item', () => {
        it('should create an Item instance with all fields', () => {
            const price = new Price('COP', 1000, 0);
            const attr = new Attribute('BRAND', 'Marca', 'Sony');
            const item = new Item(
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

            expect(item.id).toBe('123');
            expect(item.pictures).toEqual(['img1.jpg']);
            expect(item.attributes).toHaveLength(1);
            expect(item.attributes[0]).toBeInstanceOf(Attribute);
        });
    });
});
