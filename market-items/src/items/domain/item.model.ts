export class Price {
    currency: string;
    amount: number;
    decimals: number;

    constructor(currency: string, amount: number, decimals: number) {
        this.currency = currency;
        this.amount = amount;
        this.decimals = decimals;
    }
}

export class Item {
    id: string;
    title: string;
    price: Price;
    picture: string;
    condition: string;
    free_shipping: boolean;
    sold_quantity: number;
    description: string;

    constructor(
        id: string,
        title: string,
        price: Price,
        picture: string,
        condition: string,
        free_shipping: boolean,
        sold_quantity: number,
        description: string,
    ) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.picture = picture;
        this.condition = condition;
        this.free_shipping = free_shipping;
        this.sold_quantity = sold_quantity;
        this.description = description;
    }
}
