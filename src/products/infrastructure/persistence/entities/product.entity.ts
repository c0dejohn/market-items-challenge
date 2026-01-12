import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('products')
export class ProductEntity {
    @PrimaryColumn()
    id: string;

    @Column()
    title: string;

    @Column('simple-json')
    price: { currency: string; amount: number; decimals: number };

    @Column('simple-json')
    pictures: string[];

    @Column()
    condition: string;

    @Column()
    free_shipping: boolean;

    @Column()
    sold_quantity: number;

    @Column()
    description: string;

    @Column()
    permalink: string;

    @Column('simple-json')
    attributes: { id: string; name: string; value_name: string }[];

    @Column()
    city: string;
}
