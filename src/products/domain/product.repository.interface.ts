import { Product } from './product.model';

export interface ProductRepository {
    findById(id: string): Promise<Product | null>;
}

export const PRODUCT_REPOSITORY = 'PRODUCT_REPOSITORY';
