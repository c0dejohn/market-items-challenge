import { ApiProperty } from '@nestjs/swagger';

export class Price {
    @ApiProperty()
    currency: string;
    @ApiProperty()
    amount: number;
    @ApiProperty()
    decimals: number;

    constructor(currency: string, amount: number, decimals: number) {
        this.currency = currency;
        this.amount = amount;
        this.decimals = decimals;
    }
}

export class Attribute {
    @ApiProperty()
    id: string;
    @ApiProperty()
    name: string;
    @ApiProperty()
    value_name: string;

    constructor(id: string, name: string, value_name: string) {
        this.id = id;
        this.name = name;
        this.value_name = value_name;
    }
}

export class Product {
    @ApiProperty()
    id: string;
    @ApiProperty()
    title: string;
    @ApiProperty()
    price: Price;
    @ApiProperty()
    pictures: string[];
    @ApiProperty()
    condition: string;
    @ApiProperty()
    free_shipping: boolean;
    @ApiProperty()
    sold_quantity: number;
    @ApiProperty()
    description: string;
    @ApiProperty()
    permalink: string;
    @ApiProperty({ type: [Attribute] })
    attributes: Attribute[];
    @ApiProperty()
    city: string;

    constructor(
        id: string,
        title: string,
        price: Price,
        pictures: string[],
        condition: string,
        free_shipping: boolean,
        sold_quantity: number,
        description: string,
        permalink: string,
        attributes: Attribute[],
        city: string,
    ) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.pictures = pictures;
        this.condition = condition;
        this.free_shipping = free_shipping;
        this.sold_quantity = sold_quantity;
        this.description = description;
        this.permalink = permalink;
        this.attributes = attributes;
        this.city = city;
    }
}
